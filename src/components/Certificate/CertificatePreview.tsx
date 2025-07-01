import React, { useState } from 'react';
import { StudentWithResults } from '../../types';
import CertificateTemplate from './CertificateTemplate';
import { generateCertificate, CertificateOptions } from '../../utils/certificateGenerator';
import { X, Download, Printer, Loader } from 'lucide-react';

interface CertificatePreviewProps {
  student: StudentWithResults;
  isOpen: boolean;
  onClose: () => void;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ student, isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = async (format: 'pdf' | 'png' | 'jpeg' = 'pdf') => {
    setIsGenerating(true);
    setError(null);

    try {
      const options: CertificateOptions = {
        format,
        quality: 0.95,
        scale: 2,
      };

      await generateCertificate(student, options);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download certificate');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Certificate Preview</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleDownload('pdf')}
              disabled={isGenerating}
              className="flex items-center px-3 py-2 bg-[#1A3A6E] hover:bg-[#2a5ba6] disabled:bg-gray-300 text-white rounded-md transition-colors duration-200 text-sm"
            >
              {isGenerating ? (
                <Loader className="animate-spin mr-2" size={16} />
              ) : (
                <Download className="mr-2" size={16} />
              )}
              PDF
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center px-3 py-2 bg-[#F26522] hover:bg-orange-600 text-white rounded-md transition-colors duration-200 text-sm"
            >
              <Printer className="mr-2" size={16} />
              Print
            </button>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Certificate Content */}
        <div className="certificate-preview-body">
          <div className="certificate-wrapper">
            <CertificateTemplate student={student} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>Certificate for: <span className="font-semibold">{student.name}</span></p>
              <p>Student ID: <span className="font-semibold">{student.id}</span></p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDownload('png')}
                disabled={isGenerating}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 rounded text-sm transition-colors duration-200"
              >
                PNG
              </button>
              <button
                onClick={() => handleDownload('jpeg')}
                disabled={isGenerating}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 rounded text-sm transition-colors duration-200"
              >
                JPEG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;
