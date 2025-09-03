import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import EventEmitter from './EventEmitter';

interface AssetItem {
  name: string;
  type: string;
  path: string;
}

export default class Resources extends EventEmitter {
  public sources: AssetItem[];
  public items: { [key: string]: any } = {};
  public queue: number;
  public loaded: number;
  private loaders: any = {};

  constructor(sources: AssetItem[]) {
    super();

    this.sources = sources;
    this.queue = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();

    // Configure DRACO loader for newer Three.js versions
    this.loaders.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    this.loaders.dracoLoader.setDecoderConfig({ type: 'js' });
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  startLoading() {
    for (const asset of this.sources) {
      if (asset.type === 'glbModel') {
        this.loaders.gltfLoader.load(
          asset.path,
          (file: any) => {
            this.singleAssetLoaded(asset, file);
          },
          undefined,
          undefined
        );
      } else if (asset.type === 'videoTexture') {
        const video = document.createElement('video');
        video.src = asset.path;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;
        video.loop = true;
        video.play();

        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.flipY = true;
        videoTexture.minFilter = THREE.NearestFilter;
        videoTexture.magFilter = THREE.NearestFilter;
        videoTexture.generateMipmaps = false;
        videoTexture.colorSpace = THREE.SRGBColorSpace;

        this.singleAssetLoaded(asset, videoTexture);
      }
    }
  }

  singleAssetLoaded(asset: AssetItem, file: any) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.trigger('ready');
    }
  }
}
