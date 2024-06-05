import React from "react";
import ContentLoader from "react-content-loader";
interface loader {
  className:string
}
export const ChatSkeletonMain = (props:loader) => {
  return (
    <div className={`ml-3 ${props.className}`}>
      <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#1f1f1f"
        foregroundColor="#8c8c8c"
      >        
        <rect x="0" y="26" rx="3" ry="3" width="52" height="6" />
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      </ContentLoader>
    </div>
  );
};

export const ChatSkeletonMini = (props:loader) => {
  return (
    <div className={`ml-3 ${props.className}`}>
      <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#1f1f1f"
        foregroundColor="#8c8c8c"
      >        
        <rect x="0" y="26" rx="3" ry="3" width="21" height="6" />
        <rect x="0" y="56" rx="3" ry="3" width="205" height="6" />
        <rect x="0" y="72" rx="3" ry="3" width="190" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="89" height="6" />
      </ContentLoader>
    </div>
  );
};
