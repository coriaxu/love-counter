function calculateDaysTogether() {
    var startDate = new Date('2009-12-10');
    var today = new Date();
    var timeDifference = today.getTime() - startDate.getTime();
    var daysTogether = Math.floor(timeDifference / (1000 * 3600 * 24));
    document.querySelector('.days').innerText = daysTogether + '天';
}
calculateDaysTogether();

// 倒计时
function countdown() {
    var anniversaryDate = new Date('2024-12-10');
    var now = new Date();
    var timeDifference = anniversaryDate.getTime() - now.getTime();

    var days = Math.floor(timeDifference / (1000 * 3600 * 24));
    var hours = Math.floor((timeDifference / (1000 * 3600)) % 24);
    var minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    var seconds = Math.floor((timeDifference / 1000) % 60);

    document.querySelectorAll('.countdown-value')[0].innerText = days;
    document.querySelectorAll('.countdown-value')[1].innerText = hours;
    document.querySelectorAll('.countdown-value')[2].innerText = minutes;
    document.querySelectorAll('.countdown-value')[3].innerText = seconds;
}
setInterval(countdown, 1000);
countdown();
