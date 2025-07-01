import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { StudentWithResults } from '../types';
import { generateCertificateFilename, validateCertificateRequirements } from './certificateHelpers';

export interface CertificateOptions {
  format?: 'pdf' | 'png' | 'jpeg';
  quality?: number;
  scale?: number;
  filename?: string;
}

/**
 * Generate and download a certificate for a student
 */
export const generateCertificate = async (
  student: StudentWithResults,
  options: CertificateOptions = {}
): Promise<void> => {
  const {
    format = 'pdf',
    quality = 0.95,
    scale = 2,
    filename = generateCertificateFilename(student, format)
  } = options;

  try {
    // Get the certificate element
    const certificateElement = document.getElementById('certificate-template');
    
    if (!certificateElement) {
      throw new Error('Certificate template not found');
    }

    // Configure html2canvas options for landscape orientation
    const canvasOptions = {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: Math.max(certificateElement.scrollWidth, 1122), // A4 landscape width in pixels at 96 DPI
      height: Math.max(certificateElement.scrollHeight, 794), // A4 landscape height in pixels at 96 DPI
      scrollX: 0,
      scrollY: 0,
      windowWidth: 1122,
      windowHeight: 794,
    };

    // Generate canvas from the certificate element
    const canvas = await html2canvas(certificateElement, canvasOptions);
    
    if (format === 'pdf') {
      await generatePDF(canvas, filename, quality);
    } else {
      await generateImage(canvas, format, filename, quality);
    }
  } catch (error) {
    console.error('Error generating certificate:', error);
    throw new Error('Failed to generate certificate. Please try again.');
  }
};

/**
 * Generate PDF from canvas
 */
const generatePDF = async (canvas: HTMLCanvasElement, filename: string, quality: number): Promise<void> => {
  const imgData = canvas.toDataURL('image/jpeg', quality);
  
  // Calculate PDF dimensions (A4 landscape)
  const pdfWidth = 297; // A4 width in mm (landscape)
  const pdfHeight = 210; // A4 height in mm (landscape)
  
  // Calculate image dimensions to fit PDF while maintaining aspect ratio
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  
  const scaledWidth = imgWidth * ratio;
  const scaledHeight = imgHeight * ratio;
  
  // Center the image on the PDF
  const x = (pdfWidth - scaledWidth) / 2;
  const y = (pdfHeight - scaledHeight) / 2;
  
  // Create PDF
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });
  
  pdf.addImage(imgData, 'JPEG', x, y, scaledWidth, scaledHeight);
  
  // Save the PDF
  pdf.save(`${filename}.pdf`);
};

/**
 * Generate image from canvas
 */
const generateImage = async (
  canvas: HTMLCanvasElement, 
  format: 'png' | 'jpeg', 
  filename: string, 
  quality: number
): Promise<void> => {
  const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
  const dataURL = canvas.toDataURL(mimeType, quality);
  
  // Create download link
  const link = document.createElement('a');
  link.download = `${filename}.${format}`;
  link.href = dataURL;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Preview certificate in a new window
 */
export const previewCertificate = async (student: StudentWithResults): Promise<void> => {
  try {
    const certificateElement = document.getElementById('certificate-template');
    
    if (!certificateElement) {
      throw new Error('Certificate template not found');
    }

    // Clone the certificate element
    const clonedElement = certificateElement.cloneNode(true) as HTMLElement;
    
    // Create a new window for preview with landscape dimensions
    const previewWindow = window.open('', '_blank', 'width=1400,height=900,scrollbars=yes');
    
    if (!previewWindow) {
      throw new Error('Unable to open preview window. Please check your popup blocker.');
    }

    // Write the certificate HTML to the new window
    previewWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate Preview - ${student.name}</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: system-ui, -apple-system, sans-serif;
              background-color: #f3f4f6;
              min-width: 1200px;
            }
            .certificate-container {
              width: 100%;
              max-width: 1200px;
              margin: 0 auto;
              background: white;
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
              border-radius: 8px;
              overflow: auto;
            }
            /* Force landscape orientation for mobile */
            @media screen and (max-width: 768px) {
              body {
                transform: rotate(90deg);
                transform-origin: center center;
                width: 100vh;
                height: 100vw;
                overflow-x: auto;
                position: fixed;
                top: 0;
                left: 0;
              }
            }
            .print-button {
              position: fixed;
              top: 20px;
              right: 20px;
              background: #1A3A6E;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              cursor: pointer;
              font-weight: 600;
              z-index: 1000;
            }
            .print-button:hover {
              background: #2a5ba6;
            }
            @media print {
              body { background: white; padding: 0; }
              .certificate-container { box-shadow: none; border-radius: 0; }
              .print-button { display: none; }
            }
          </style>
        </head>
        <body>
          <button class="print-button" onclick="window.print()">Print Certificate</button>
          <div class="certificate-container">
            ${clonedElement.outerHTML}
          </div>
        </body>
      </html>
    `);
    
    previewWindow.document.close();
  } catch (error) {
    console.error('Error previewing certificate:', error);
    throw new Error('Failed to preview certificate. Please try again.');
  }
};

/**
 * Validate student data for certificate generation
 */
export const validateStudentForCertificate = (student: StudentWithResults): boolean => {
  const validation = validateCertificateRequirements(student);
  return validation.isValid;
};

/**
 * Get certificate generation status message
 */
export const getCertificateStatusMessage = (student: StudentWithResults): string => {
  const validation = validateCertificateRequirements(student);

  if (!validation.isValid) {
    return validation.issues.join('. ');
  }

  const passedCourses = student.results.filter(r => r.status === 'passed').length;
  const totalCourses = student.results.length;

  if (passedCourses === 0) {
    return 'No courses passed. Certificate cannot be generated.';
  }

  if (passedCourses < totalCourses) {
    return `Certificate available (${passedCourses}/${totalCourses} courses passed)`;
  }

  return 'Certificate available (All courses completed successfully)';
};
