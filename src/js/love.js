function love(id) {
    if (m.has(id)) {
        m.set(id, m.get(id) + 1);
    } else { m.set(id, 1) }
} 