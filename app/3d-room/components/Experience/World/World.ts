import Experience from '../Experience';
import Environment from './Environment';
import Room from './Room';
import Floor from './Floor';
import EventEmitter from '../Utils/EventEmitter';

export default class World extends EventEmitter {
  private experience: Experience;
  private sizes: any;
  private scene: any;
  private resources: any;
  public environment!: Environment;
  public room!: Room;
  public floor!: Floor;

  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on('ready', () => {
      this.environment = new Environment();
      this.floor = new Floor();
      this.room = new Room();

      // Emit world ready event for Preloader
      this.trigger('worldready');
    });
  }

  resize() {
    if (this.environment) {
      this.environment.resize();
    }
    if (this.room) {
      this.room.resize();
    }
  }

  update() {
    if (this.room) {
      this.room.update();
    }
    if (this.environment) {
      this.environment.update();
    }
  }
}
