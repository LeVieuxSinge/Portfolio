import GLTFLoader from 'three-gltf-loader';

/* ============================================================= */

// -------- GENERAL PARAMETERS -------- //

var LoaderGTLF = new GLTFLoader();

// -------- GENERAL METHODS -------- //

// None

/* ============================================================= */

class AssetManager {

  constructor(params) {

    // -------- PARAMETERS -------- //

    var _params = params !== undefined ? params : {};

    this.assets = [];

    // Internal Events
    this.onProgress = function () {};

    this.debug = _params.debug !== undefined ? _params.debug : false;

  }

  // -------- METHODS -------- //

  add(type, label, url) {

    // Push new asset in array
    this.assets.push({
      label: label,
      url: url,
      type: type,
      progress: 0,
      loaded: false,
      value: null,
    });

  }

  get(label) {

    // Return asset value with corresponding label
    var output = this.assets.find(e => e.label === label);
    return output.value;

  }

  async load() {

    // Execute load function on each object
    if (this.assets.length) {
      for (let i = 0; i < this.assets.length; i++) {
        const e = this.assets[i];
        // Call load function according to type
        if (e.type === 'Video') {
          await this.LoadVideo(e);
        }

        else if (e.type === 'GLTF') {
          await this.LoadGLTF(e);
        }

        else {
          console.error('Asset type not recognized for : ' + e.type);
        }
      }
    }

  }

  LoadVideo(asset) {

    return new Promise(resolve => {
      try {
        // Create DOM element
        var video = document.createElement('video');
        var source = document.createElement('source');
        video.appendChild(source);

        // Options
        video.autoplay = true;
        video.muted = true;
        video.loop = true;

        // Source
        source.src = asset.url;

        // Type
        if (asset.url.includes('.mp4')) {
          source.type = "video/mp4";
        }

        else if (asset.url.includes('.webm')) {
          source.type = "video/webm";
        }

        else if (asset.url.includes('.ogg')) {
          source.type = "video/ogg";
        }

        var start = null;
        var end = null;

        // Events
        video.onloadstart = () => {
          // Output progress
          this.debug ? console.log(`${asset.label} is loading...`) : null;
        };

        video.oncanplay = () => {
          // Loaded check
          if (!asset.loaded) {
            // Set asset progress
            asset.progress = 100;
            // Call event
            this.onProgress(this.progress);
            // Output progress
            this.debug ? console.log(`${asset.label} loaded`) : null;
            // Store value
            asset.value = {
              video: video,
              source: source,
            };
            // Set as loaded
            asset.loaded = true;
            // Ouput
            resolve(video);
          }
        };

        // Force render
        video.load();

        // export video component and source component

      } catch (error) {
        console.error(error);
      }
    });

  }

  LoadGLTF(asset) {

    return new Promise(resolve => {
      try {
        // Load using GLTF loader
        LoaderGTLF.load(asset.url,
          (gltf) => {
            // Called when the resource is loaded
            // Length computable false so progress  0
            if (asset.progress === 0) {
              asset.progress = 100;
              // Call event
              this.onProgress(this.progress);
            }
            // Store value
            asset.value = gltf;
            // Set as loaded
            asset.loaded = true;
            // Ouput
            resolve(gltf);
          },
          (xhr) => {
            // Called while loading is progressing
            if (xhr.lengthComputable) {
              // Set asset progress
              asset.progress = Math.round(xhr.loaded / xhr.total * 100);
            } else {
              // Set asset progress
              asset.progress = 0;
            }
            // Call event
            this.onProgress(this.progress);
            // Output progress
            this.debug ? console.log(`${asset.label + ' ' + Math.round( xhr.loaded / xhr.total * 100 )}% loaded...`) : null;
          },
          (error) => {
            // Called when loading has errors
            console.error('An error happened', error);
          }, );
      } catch (error) {
        console.error(error);
      }
    });

  }

  // -------- GETTERS -------- //

  get progress() {

    // Get average of progress between all assets
    var _totalProgress = 0;
    this.assets.forEach(e => {
      _totalProgress += e.progress;
    });

    if (this.assets.length !== 0) {
      return Math.round(_totalProgress / this.assets.length);
    } else {
      return _totalProgress / 1;
    }

  }

  // -------- SETTERS -------- //

  // None

}

/* ============================================================= */

/**
 * Exports
 */
export {
  AssetManager,
}