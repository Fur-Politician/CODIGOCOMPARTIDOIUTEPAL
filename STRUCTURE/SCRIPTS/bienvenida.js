function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Añadir un cero delante si los minutos o segundos son menores a 10
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('time-display').textContent = `HORA ${timeString}`;
}

// Actualizar la hora inmediatamente y luego cada segundo
updateTime();
setInterval(updateTime, 1000);