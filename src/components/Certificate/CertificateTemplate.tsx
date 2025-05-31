import React from 'react';
import { StudentWithResults } from '../../types';
import { getCourseByCourseCode } from '../../data/courses';
import {
  generateCertificateData
} from '../../utils/certificateHelpers';


interface CertificateTemplateProps {
  student: StudentWithResults;
  className?: string;
}

const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ student, className = '' }) => {
  const certificateData = generateCertificateData(student);

  return (
    <div className={`bg-white relative overflow-visible min-h-[700px] w-full aspect-[420/297] ${className}`} id="certificate-template">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <img
          src="https://vdqbjdfhcxdkpsdrojtd.supabase.co/storage/v1/object/public/media-binbaz//binbaz%20logo.jpg"
          alt="Binbaz Logo Watermark"
          className="w-80 h-80 object-contain"
        />
      </div>

      {/* Decorative Corner Elements */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 420 297">
        {/* Top Left Corner */}
        <g>
          <polygon points="0,0 60,0 0,40" fill="#1A3A6E" />
          <polygon points="0,0 40,0 0,25" fill="#F26522" />
          <rect x="15" y="15" width="30" height="2" fill="#F26522" />
          <rect x="15" y="20" width="20" height="2" fill="#1A3A6E" />
        </g>

        {/* Top Right Corner */}
        <g>
          <polygon points="420,0 360,0 420,40" fill="#1A3A6E" />
          <polygon points="420,0 380,0 420,25" fill="#F26522" />
          <rect x="375" y="15" width="30" height="2" fill="#F26522" />
          <rect x="385" y="20" width="20" height="2" fill="#1A3A6E" />
        </g>

        {/* Bottom Left Corner */}
        <g>
          <polygon points="0,297 60,297 0,257" fill="#1A3A6E" />
          <polygon points="0,297 40,297 0,272" fill="#F26522" />
          <rect x="15" y="275" width="30" height="2" fill="#F26522" />
          <rect x="15" y="280" width="20" height="2" fill="#1A3A6E" />
        </g>

        {/* Bottom Right Corner */}
        <g>
          <polygon points="420,297 360,297 420,257" fill="#1A3A6E" />
          <polygon points="420,297 380,297 420,272" fill="#F26522" />
          <rect x="375" y="275" width="30" height="2" fill="#F26522" />
          <rect x="385" y="280" width="20" height="2" fill="#1A3A6E" />
        </g>

        {/* Side Decorative Elements */}
        <g>
          {/* Left side */}
          <rect x="8" y="100" width="4" height="30" fill="#F26522" />
          <rect x="8" y="140" width="4" height="20" fill="#1A3A6E" />
          <rect x="8" y="170" width="4" height="30" fill="#F26522" />

          {/* Right side */}
          <rect x="408" y="100" width="4" height="30" fill="#F26522" />
          <rect x="408" y="140" width="4" height="20" fill="#1A3A6E" />
          <rect x="408" y="170" width="4" height="30" fill="#F26522" />
        </g>

        {/* Geometric Pattern Elements */}
        <g opacity="0.1">
          <circle cx="80" cy="80" r="15" fill="#1A3A6E" />
          <circle cx="340" cy="80" r="15" fill="#F26522" />
          <circle cx="80" cy="217" r="15" fill="#F26522" />
          <circle cx="340" cy="217" r="15" fill="#1A3A6E" />

          <polygon points="100,60 115,75 100,90 85,75" fill="#F26522" />
          <polygon points="320,60 335,75 320,90 305,75" fill="#1A3A6E" />
          <polygon points="100,207 115,222 100,237 85,222" fill="#1A3A6E" />
          <polygon points="320,207 335,222 320,237 305,222" fill="#F26522" />
        </g>
      </svg>

      {/* Enhanced Decorative Border */}
      <div className="absolute inset-6 border-4 border-[#1A3A6E] rounded-lg shadow-lg">
        <div className="absolute inset-3 border-2 border-[#F26522] rounded-md">
          <div className="absolute inset-2 border border-gray-300 rounded-sm"></div>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="relative z-10 px-12 py-6 h-full flex flex-col">
        {/* Top Section */}
        <div className="flex-shrink-0">
          {/* Header */}
          <div className="text-center mb-2 relative">
            {/* Decorative Header Background */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-96 h-20 opacity-5">
              <svg viewBox="0 0 384 80" className="w-full h-full">
                <polygon points="0,40 40,0 344,0 384,40 344,80 40,80" fill="#1A3A6E" />
              </svg>
            </div>

            <div className="flex justify-center mb-1 relative">
              <div className="relative">
                <img
                  src="https://vdqbjdfhcxdkpsdrojtd.supabase.co/storage/v1/object/public/media-binbaz//binbaz%20logo.jpg"
                  alt="Binbaz International Academy"
                  className="h-10 drop-shadow-md relative z-10"
                />
                {/* Logo decorative frame */}
                <div className="absolute -inset-1 border border-[#F26522] rounded-full opacity-20"></div>
                <div className="absolute -inset-2 border border-[#1A3A6E] rounded-full opacity-15"></div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-[#1A3A6E] mb-0.5 tracking-wide relative">
              BINBAZ INTERNATIONAL ACADEMY
              {/* Decorative underline */}
              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-60 h-0.5 bg-gradient-to-r from-transparent via-[#1A3A6E] to-transparent"></div>
            </h1>

            <p className="text-sm text-gray-600 mb-1 font-medium">Online Islamic Institute</p>

            {/* Enhanced decorative line */}
            <div className="flex justify-center items-center mb-1 relative">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#F26522]"></div>
              <div className="w-4 h-4 bg-[#1A3A6E] rounded-full mx-2 relative flex items-center justify-center">
                <div className="w-2 h-2 bg-[#F26522] rounded-full"></div>
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#F26522]"></div>
            </div>

            {/* Additional decorative elements */}
            <div className="flex justify-center space-x-6 mt-1">
              <div className="w-1.5 h-1.5 bg-[#F26522] rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-[#1A3A6E] rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-[#F26522] rounded-full"></div>
            </div>
          </div>

          {/* Certificate Title */}
          <div className="text-center mb-1.5 relative">
            {/* Decorative background for title */}
            <div className="absolute inset-0 flex justify-center items-center opacity-5">
              <svg width="300" height="40" viewBox="0 0 300 40">
                <rect x="0" y="15" width="300" height="10" fill="#1A3A6E" />
                <polygon points="0,20 15,10 15,30" fill="#F26522" />
                <polygon points="300,20 285,10 285,30" fill="#F26522" />
              </svg>
            </div>

            <h2 className="text-lg font-bold text-[#1A3A6E] mb-1 relative">
              CERTIFICATE OF ACADEMIC ACHIEVEMENT
              {/* Decorative flourishes */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 border border-[#F26522] rotate-45"></div>
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-3 h-3 border border-[#F26522] rotate-45"></div>
            </h2>

            <div className="flex justify-center items-center mb-1">
              <div className="w-10 h-0.5 bg-[#F26522]"></div>
              <div className="w-1.5 h-1.5 bg-[#1A3A6E] rounded-full mx-1.5"></div>
              <div className="w-10 h-0.5 bg-[#F26522]"></div>
            </div>

            <p className="text-xs text-gray-700">
              This is to certify that
            </p>
          </div>

          {/* Student Name */}
          <div className="text-center mb-1.5 relative">
            {/* Decorative frame for student name */}
            <div className="absolute inset-0 flex justify-center items-center opacity-10">
              <svg width="280" height="50" viewBox="0 0 280 50">
                <rect x="10" y="20" width="260" height="15" fill="#1A3A6E" rx="7" />
                <rect x="0" y="22" width="15" height="8" fill="#F26522" />
                <rect x="265" y="22" width="15" height="8" fill="#F26522" />
              </svg>
            </div>

            <div className="border-b border-[#1A3A6E] pb-0.5 mb-1 inline-block min-w-60 relative">
              <h3 className="text-xl font-bold text-[#1A3A6E] relative z-10">
                {student.name.toUpperCase()}
              </h3>
              {/* Decorative elements around name */}
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#F26522] rounded-full"></div>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#F26522] rounded-full"></div>
            </div>

            <p className="text-xs text-gray-700">
              Student ID: <span className="font-semibold">{student.id}</span>
            </p>
          </div>

          {/* Achievement Text */}
          <div className="text-center mb-1.5">
            <p className="text-xs text-gray-700 leading-relaxed max-w-3xl mx-auto">
              has successfully completed the <strong>First Semester</strong> of the <strong>{certificateData.academicSession} Academic Session</strong>
              in the <strong>{certificateData.program}</strong> program.
            </p>
          </div>
        </div>

        {/* Middle Section - Course Results */}
        <div className="flex-grow flex flex-col justify-center mt-1">
          <div className="mb-2">
            <h4 className="text-sm font-bold text-[#1A3A6E] text-center mb-2">COURSE RESULTS</h4>
            <div className="w-full max-w-3xl mx-auto px-2 space-y-1">
              {certificateData.results.map((result, index) => {
                const course = getCourseByCourseCode(result.courseCode);

                return (
                  <div key={index} className="flex justify-between items-center py-1 border-b border-gray-200 w-full">
                    <div className="text-left flex-1 pr-3">
                      <span className="text-sm font-medium text-gray-800 break-words">{course?.title}</span>
                    </div>
                    <div className="text-right flex-shrink-0 min-w-[100px]">
                      <span className="text-base font-bold text-[#1A3A6E] mr-2">{result.grade}</span>
                      <span className="text-sm text-gray-600">{result.marks}/100</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default CertificateTemplate;
