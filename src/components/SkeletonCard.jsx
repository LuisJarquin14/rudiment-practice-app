import React from 'react';

export default function SkeletonCard({compact=false}){
  return (
    <div className="card skeleton-card">
      <div className="card-title-row">
        <div style={{width: '55%'}} className="skeleton-line title"></div>
        <div style={{width: 36, height: 32}} className="skeleton-circle"></div>
      </div>
      <div className="rudiment-img-wrap">
        <div className={`skeleton-img ${compact ? 'compact' : ''}`}></div>
      </div>
      <div style={{height: 14, width: '80%'}} className="skeleton-line"></div>
      <div style={{height: 12, width: '60%', marginTop:8}} className="skeleton-line"></div>
      <div className="card-actions" style={{marginTop:12}}>
        <div style={{width:110, height:32}} className="skeleton-chip"></div>
        <div style={{width:90, height:32, marginLeft:8}} className="skeleton-chip"></div>
      </div>
    </div>
  );
}
