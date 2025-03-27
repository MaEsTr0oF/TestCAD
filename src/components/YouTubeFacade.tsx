import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

// Интерфейс для props компонента
interface YouTubeFacadeProps {
  videoId: string;
  title: string;
}

// Интерфейс для props стилизованного компонента VideoPreview
interface VideoPreviewProps {
  thumbnail: string;
  fallbackColor?: string;
  isLoading?: boolean;
}

// Кэш для изображений превью, чтобы не загружать их повторно
const thumbnailCache: Record<string, string> = {};

// Стилизованный контейнер для видео с сохранением пропорций 16:9
const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* Соотношение сторон 16:9 */
  height: 0;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

// Стилизованное превью видео с кнопкой воспроизведения
const VideoPreview = styled.div<VideoPreviewProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${(props: VideoPreviewProps) => props.thumbnail ? `url(${props.thumbnail})` : 'none'};
  background-color: ${(props: VideoPreviewProps) => props.fallbackColor || '#000'};
  background-size: cover;
  background-position: center;
  cursor: ${(props: VideoPreviewProps) => props.isLoading ? 'wait' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props: VideoPreviewProps) => props.isLoading ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)'};
    transition: background-color 0.3s ease;
  }

  &::after {
    content: ${(props: VideoPreviewProps) => props.isLoading ? "''" : "''"};
    width: ${(props: VideoPreviewProps) => props.isLoading ? '40px' : '68px'};
    height: ${(props: VideoPreviewProps) => props.isLoading ? '40px' : '48px'};
    background-color: ${(props: VideoPreviewProps) => props.isLoading ? 'transparent' : '#ff0000'};
    border-radius: ${(props: VideoPreviewProps) => props.isLoading ? '50%' : '10px'};
    position: relative;
    z-index: 1;
    background-image: ${(props: VideoPreviewProps) => props.isLoading 
      ? 'linear-gradient(to right, transparent 0%, white 50%, transparent 100%)' 
      : 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>\')'};
    background-repeat: no-repeat;
    background-position: center;
    transition: transform 0.3s ease;
    animation: ${(props: VideoPreviewProps) => props.isLoading ? 'spin 1.5s linear infinite' : 'none'};
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  &:hover::before {
    background-color: rgba(0, 0, 0, 0.5);
  }

  &:hover::after {
    transform: ${(props: VideoPreviewProps) => props.isLoading ? 'rotate(360deg)' : 'scale(1.1)'};
  }
`;

// Стилизованный iframe для YouTube
const YouTubeIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

// Стилизованный индикатор загрузки
const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
  z-index: 10;

  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

// Функция для безопасной загрузки изображения
const loadImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Проверяем кэш
    if (thumbnailCache[src]) {
      resolve(thumbnailCache[src]);
      return;
    }
    
    const img = new Image();
    
    // Устанавливаем таймаут для загрузки
    const timeoutId = setTimeout(() => {
      reject(new Error('Тайм-аут загрузки изображения'));
    }, 5000);
    
    img.onload = () => {
      clearTimeout(timeoutId);
      thumbnailCache[src] = src; // Сохраняем в кэш
      resolve(src);
    };
    
    img.onerror = () => {
      clearTimeout(timeoutId);
      reject(new Error('Ошибка загрузки изображения'));
    };
    
    img.src = src;
  });
};

const YouTubeFacade: React.FC<YouTubeFacadeProps> = ({ videoId, title }) => {
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  
  // Загружаем превью изображение
  useEffect(() => {
    setIsLoading(true);
    
    // Массив возможных форматов превью
    const thumbnailFormats = [
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/default.jpg`
    ];
    
    // Пробуем загрузить изображения по очереди
    const loadThumbnails = async () => {
      for (const format of thumbnailFormats) {
        try {
          const url = await loadImage(format);
          setThumbnailUrl(url);
          setIsLoading(false);
          return;
        } catch (error) {
          console.log(`Не удалось загрузить: ${format}`, error);
          // Продолжаем с следующим форматом
        }
      }
      
      // Если ни одно изображение не загрузилось, просто завершаем загрузку
      console.log('Не удалось загрузить ни одно превью, используем запасной цвет');
      setIsLoading(false);
    };
    
    loadThumbnails();
    
    // Очистка при размонтировании
    return () => {
      setIsLoading(false);
    };
  }, [videoId]);
  
  // Обработчик клика для загрузки видео
  const handleVideoLoad = () => {
    if (!isLoading) {
      setVideoLoaded(true);
    }
  };
  
  // Палитра цветов для запасных фонов
  const fallbackColors = ['#c62828', '#6a1b9a', '#283593', '#0277bd', '#00695c', '#558b2f', '#ef6c00', '#4e342e'];
  const randomColor = fallbackColors[Math.floor(Math.random() * fallbackColors.length)];
  
  return (
    <VideoContainer>
      {!videoLoaded ? (
        <VideoPreview 
          onClick={handleVideoLoad} 
          thumbnail={thumbnailUrl}
          fallbackColor={randomColor}
          isLoading={isLoading}
          aria-label={`Воспроизвести видео: ${title}`}
          role="button"
        >
          {isLoading && <LoadingIndicator />}
        </VideoPreview>
      ) : (
        <YouTubeIframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )}
    </VideoContainer>
  );
};

export default YouTubeFacade; 