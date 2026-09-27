import Image from '@/components/ui/Image';

const Avatar = () => {
  return (
    <div className="max-h-[430px] overflow-hidden rounded-md">
      <Image src="/static/images/avatar.png" alt="Pixel-art portrait of Coooder" width={430} height={430} />
    </div>
  );
};

export default Avatar;
