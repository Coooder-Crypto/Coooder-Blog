import { Metadata } from 'next';
import ThreeDRoomClient from './ThreeDRoomClient';

export const metadata: Metadata = {
  title: '3D Room Experience',
  description: 'Interactive 3D room visualization with Three.js',
};

export default function ThreeDRoomPage() {
  return <ThreeDRoomClient />;
}
