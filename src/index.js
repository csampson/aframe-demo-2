document.querySelector('a-scene').addEventListener('loaded', () => {
  const lat = 29.794176;
  const lon = -90.582191;
  const radius = 1.25 + 0.02;
  const phi = (90 - lat) * (Math.PI / 180),
    theta = (lon + 180) * (Math.PI / 180),
    x = -(radius * Math.sin(phi) * Math.cos(theta)),
    y = radius * Math.cos(phi),
    z = radius * Math.sin(phi) * Math.sin(theta);

  const vector = new THREE.Vector3(x, y, z);

  document
    .querySelector('#la')
    .setAttribute('position', `${vector.x} ${vector.y} ${vector.z}`);
})