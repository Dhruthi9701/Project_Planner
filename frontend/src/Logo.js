import React from 'react';
import { ReactComponent as LogoSvg } from './logo.svg';

export default function Logo({ className = '', style = {} }) {
  return <LogoSvg className={className} style={style} />;
}