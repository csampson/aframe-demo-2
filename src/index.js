import data from './flights.json';

const RADIUS_EARTH = 1.25;
const RADIUS_POINT = 0.005;

const scene = document.querySelector('a-scene');

function getVector (lat, lon, alt) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const radius = RADIUS_EARTH + RADIUS_POINT + (alt * 0.0001);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

function createSatellite () {
  const element = document.createElement('a-sphere');

  element.setAttribute('color', 'red');
  element.setAttribute('radius', RADIUS_POINT);

  return element;
}

scene.addEventListener('loaded', () => {
  const satellites = data.states.slice(0, 1000);

  satellites.forEach(satellite => {
    const lat = satellite[6];
    const lon = satellite[5];
    const alt = satellite[7];
    const element = createSatellite();
    const vector = getVector(lat, lon, alt);

    document.querySelector('#earth').appendChild(element);
    element.setAttribute('position', `${vector.x} ${vector.y} ${vector.z}`);
  });
});
