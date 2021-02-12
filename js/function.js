export function onBoard(positions, position) {
    positions.forEach((pos) => {
        if (pos.x < 1 || pos.y < 1 || pos.x > 8 || pos.y > 8 || (position.x == pos.x && position.y == pos.y)) {
            positions = positions.filter(item => item !== pos);
        }
    });
    return positions;
}