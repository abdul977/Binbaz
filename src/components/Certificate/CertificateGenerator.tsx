import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentWithResults } from '../../types';
import {
  generateCertificate,
  previewCertificate,
  validateStudentForCertificate,
  getCertificateStatusMessage,
  CertificateOptions
} from '../../utils/certificateGenerator';
import { Download, Eye, FileText, Loader, Award, ExternalLink } from 'lucide-react';

interface CertificateGeneratorProps {
  student: StudentWithResults;
  className?: string;
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ student, className = '' }) => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isValidForCertificate = validateStudentForCertificate(student);
  const statusMessage = getCertificateStatusMessage(student);

  const handleGenerateCertificate = async (format: 'pdf' | 'png' | 'jpeg' = 'pdf') => {
    if (!isValidForCertificate) {
      setError('Cannot generate certificate: Student data is incomplete');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setSuccess(null);

    try {
      const options: CertificateOptions = {
        format,
        quality: 0.95,
        scale: 2,
      };

      await generateCertificate(student, options);
      setSuccess(`Certificate downloaded successfully as ${format.toUpperCase()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate certificate');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreviewCertificate = async () => {
    if (!isValidForCertificate) {
      setError('Cannot preview certificate: Student data is incomplete');
      return;
    }

    setIsPreviewing(true);
    setError(null);

    try {
      await previewCertificate(student);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to preview certificate');
    } finally {
      setIsPreviewing(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleViewFullCertificate = () => {
    navigate('/certificate');
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <Award className="text-[#F26522] mr-3" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Digital Certificate</h3>
      </div>

      <div className="mb-4">
        <p className="text-gray-600 mb-2">
          Generate and download your official academic certificate for the 2024/2025 academic session.
        </p>
        <div className={`text-sm font-medium ${
          isValidForCertificate ? 'text-green-600' : 'text-orange-600'
        }`}>
          {statusMessage}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex justify-between items-start">
            <p className="text-red-700 text-sm">{error}</p>
            <button
              onClick={clearMessages}
              className="text-red-500 hover:text-red-700 ml-2"
              aria-label="Close error message"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex justify-between items-start">
            <p className="text-green-700 text-sm">{success}</p>
            <button
              onClick={clearMessages}
              className="text-green-500 hover:text-green-700 ml-2"
              aria-label="Close success message"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* View Full Certificate */}
        <button
          onClick={handleViewFullCertificate}
          disabled={!isValidForCertificate}
          className="w-full flex items-center justify-center px-4 py-3 bg-[#1A3A6E] hover:bg-[#2a5ba6] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors duration-200 font-medium"
        >
          <ExternalLink className="mr-2" size={18} />
          View Full Certificate
        </button>

        {/* Preview Button */}
        <button
          onClick={handlePreviewCertificate}
          disabled={!isValidForCertificate || isPreviewing}
          className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 disabled:text-gray-400 rounded-md transition-colors duration-200 font-medium"
        >
          {isPreviewing ? (
            <Loader className="animate-spin mr-2" size={18} />
          ) : (
            <Eye className="mr-2" size={18} />
          )}
          {isPreviewing ? 'Opening Preview...' : 'Quick Preview'}
        </button>


      </div>

      {/* Certificate Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h4 className="font-semibold text-[#1A3A6E] mb-2">Certificate Information</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Official academic certificate for {student.semester}</li>
          <li>• Includes all course results and grades</li>
          <li>• Shows cumulative GPA and performance level</li>
          <li>• Suitable for printing and official use</li>
          <li>• Generated with secure certificate number</li>
        </ul>
      </div>
    </div>
  );
};

export default CertificateGenerator;
