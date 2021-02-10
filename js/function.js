export function onBoard(positions) {
    positions.forEach((position) => {
        if (position.x < 1 || position.y < 1 || position.x > 8 || position.y > 8) {
            positions = positions.filter(item => item !== position);
        }
    });
    return positions;
}