import React from "react";

export const Loading: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="40" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2s"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4s"
        />
      </circle>
      <circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="100" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2s"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2s"
        />
      </circle>
      <circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="160" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2s"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
    </svg>
  );
};

export const Analyse: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="m20.71 19.29-4.39-4.39c1.05-1.35 1.69-3.05 1.69-4.9 0-4.42-3.58-8-8-8S2 5.58 2 10s3.58 8 8 8c1.85 0 3.55-.63 4.9-1.69l4.39 4.39c.39.39 1 .39 1.41 0s.39-1 0-1.41ZM4 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6Z"
        fill="#000"
      />
    </svg>
  );
};

export const Eye: React.FC = () => {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="bi bi-eye"
    >
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </svg>
  );
};

