import EventEmitter from './EventEmitter';

export default class Sizes extends EventEmitter {
  public width: number;
  public height: number;
  public aspect: number;
  public pixelRatio: number;
  public device: string;

  constructor() {
    super();

    // Setup
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.device = this.width < 968 ? 'mobile' : 'desktop';

    // Resize event
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      const newDevice = this.width < 968 ? 'mobile' : 'desktop';
      if (newDevice !== this.device) {
        this.device = newDevice;
        this.trigger('switchdevice', this.device);
      }

      this.trigger('resize');
    });
  }
}
