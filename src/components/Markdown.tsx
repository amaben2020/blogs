import React from "react";

type NodeProps = {
  children: React.ReactNode;
}

export const Bold = ({ children }: NodeProps) => {
  return <strong>{children}</strong>
}

export const Text = ({ children }: NodeProps) => {
  return <p style={{ fontSize: '20px' }}>{children}</p>
}


export const Heading1 = ({ children }: NodeProps) => {
  return <h1 style={{ fontSize: '45px' }}>{children}</h1>
}