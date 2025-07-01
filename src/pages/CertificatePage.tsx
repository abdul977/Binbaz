import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CertificateTemplate from '../components/Certificate/CertificateTemplate';
import OrientationGuide from '../components/Certificate/OrientationGuide';
import { useAuth } from '../context/AuthContext';
import { generateCertificate, CertificateOptions } from '../utils/certificateGenerator';
import { Download, Printer, ArrowLeft, Loader } from 'lucide-react';

const CertificatePage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ProtectedRoute ensures authentication, so we can safely access state.student
  if (!state.student) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3A6E] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading certificate...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleDownload = async (format: 'pdf' | 'png' | 'jpeg' = 'pdf') => {
    if (!state.student) return;

    setIsGenerating(true);
    setError(null);

    try {
      const options: CertificateOptions = {
        format,
        quality: 0.95,
        scale: 2,
      };

      await generateCertificate(state.student, options);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download certificate');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Layout>
      <OrientationGuide />
      <div className="bg-gray-100 min-h-[calc(100vh-184px)]">
        <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center text-[#1A3A6E] hover:text-[#2a5ba6] transition-colors duration-200"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Dashboard
              </button>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDownload('pdf')}
                  disabled={isGenerating}
                  className="flex items-center px-4 py-2 bg-[#1A3A6E] hover:bg-[#2a5ba6] disabled:bg-gray-300 text-white rounded-md transition-colors duration-200"
                >
                  {isGenerating ? (
                    <Loader className="animate-spin mr-2" size={18} />
                  ) : (
                    <Download className="mr-2" size={18} />
                  )}
                  Download PDF
                </button>
                
                <button
                  onClick={handlePrint}
                  className="flex items-center px-4 py-2 bg-[#F26522] hover:bg-orange-600 text-white rounded-md transition-colors duration-200"
                >
                  <Printer className="mr-2" size={18} />
                  Print
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#1A3A6E] mb-2">Academic Certificate</h1>
              <p className="text-gray-600">
                Official certificate for {state.student.name} - {state.student.id}
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Certificate Display */}
          <div className="certificate-container bg-white rounded-lg shadow-lg p-4 md:p-8 mx-auto">
            <div className="certificate-wrapper">
              <CertificateTemplate student={state.student} />
            </div>
          </div>

          {/* Download Options */}
          <div className="mt-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Download Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleDownload('pdf')}
                  disabled={isGenerating}
                  className="flex items-center justify-center px-4 py-3 bg-[#1A3A6E] hover:bg-[#2a5ba6] disabled:bg-gray-300 text-white rounded-md transition-colors duration-200"
                >
                  <Download className="mr-2" size={18} />
                  PDF Document
                </button>
                
                <button
                  onClick={() => handleDownload('png')}
                  disabled={isGenerating}
                  className="flex items-center justify-center px-4 py-3 bg-[#F26522] hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-md transition-colors duration-200"
                >
                  <Download className="mr-2" size={18} />
                  PNG Image
                </button>
                
                <button
                  onClick={() => handleDownload('jpeg')}
                  disabled={isGenerating}
                  className="flex items-center justify-center px-4 py-3 bg-[#F26522] hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-md transition-colors duration-200"
                >
                  <Download className="mr-2" size={18} />
                  JPEG Image
                </button>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <h4 className="font-semibold text-[#1A3A6E] mb-2">Certificate Information</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• This is an official academic certificate from Binbaz International Academy</li>
                  <li>• The certificate includes all course results and academic performance</li>
                  <li>• PDF format is recommended for official use and printing</li>
                  <li>• Image formats are suitable for digital sharing and display</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CertificatePage;
