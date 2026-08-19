import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';
import TiltedCard from './TiltedCard';

const DEFAULT_PHOTO = '/kirti-gupta.jpg';

interface ProfileAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  showUploadOverlay?: boolean;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  className = '',
  size = 'md',
  showUploadOverlay = false,
}) => {
  const [avatarSrc, setAvatarSrc] = useState<string>(DEFAULT_PHOTO);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem('kirti_profile_avatar');
    if (savedAvatar) {
      setAvatarSrc(savedAvatar);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAvatarSrc(reader.result);
          localStorage.setItem('kirti_profile_avatar', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  if (size === 'full') {
    return (
      <div className={`relative group w-full ${className}`}>
        <TiltedCard
          imageSrc={avatarSrc}
          altText="Kirti Gupta Profile"
          captionText="Kirti Gupta — Graphic Designer"
          containerHeight="100%"
          containerWidth="100%"
          imageHeight="100%"
          imageWidth="100%"
          rotateAmplitude={14}
          scaleOnHover={1.06}
          showTooltip={true}
          showMobileWarning={false}
        />
        {showUploadOverlay && (
          <button
            type="button"
            onClick={handleTriggerUpload}
            className="absolute top-4 right-4 bg-black/75 hover:bg-emerald-500 hover:text-black border border-white/20 p-2.5 rounded-full transition-all text-white cursor-pointer shadow-lg z-30"
            title="Upload new profile photo"
          >
            <Camera className="w-4 h-4" />
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  }

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-full',
    md: 'w-10 h-10 rounded-full',
    lg: 'w-20 h-20 rounded-full',
    full: 'w-full aspect-[4/5] rounded-2xl',
  };

  return (
    <div className={`relative group overflow-hidden ${sizeClasses[size]} ${className}`}>
      <img
        src={avatarSrc}
        alt="Kirti Gupta Profile"
        className="w-full h-full object-cover object-[50%_15%] transition-all duration-300"
        onError={() => setAvatarSrc(DEFAULT_PHOTO)}
      />
      {showUploadOverlay && (
        <button
          type="button"
          onClick={handleTriggerUpload}
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white cursor-pointer backdrop-blur-xs z-20"
          title="Upload new profile photo"
        >
          <Camera className="w-5 h-5 text-emerald-400" />
          <span className="text-[10px] font-semibold tracking-wider uppercase">Upload Photo</span>
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileAvatar;
