

export default function useRouleteDrawer() {
    function polarToCartesian(cx, cy, radius, angleDeg) {
        const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
        return {
            x: cx + radius * Math.cos(angleRad),
            y: cy + radius * Math.sin(angleRad),
        };
    }

    function describeArc(cx, cy, radius, startAngle, endAngle) {
        const start = polarToCartesian(cx, cy, radius, endAngle);
        const end = polarToCartesian(cx, cy, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return [
            "M", cx, cy,
            "L", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
            "Z"
        ].join(" ");
    }

    function randomLightColor(seed) {
        // детерминированный-ish цвет по индексу seed для стабильности
        const h = Math.floor(((seed * 47) % 360));
        const s = 55;
        const l = 70;
        return `hsl(${h} ${s}% ${l}%)`;
    }



    return { polarToCartesian, randomLightColor, describeArc }
}
