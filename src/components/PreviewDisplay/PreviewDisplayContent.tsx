import React from 'react';

interface PreviewDisplayContentProps {
  htmlContent: string;
}

const PreviewDisplayContent: React.FC<PreviewDisplayContentProps> = ({ htmlContent }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default PreviewDisplayContent;