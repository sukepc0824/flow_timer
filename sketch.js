let floor;

let _hour = []
let _minute = []

function make_num(number, positionX) {
    let matter_data = [];
    String(number).split('').forEach((num, index) => {
        font[Number(num)].forEach((data, i) => {
            data.forEach((element, j) => {
                if (element === 1) {
                    matter_data.push(matter.makeBall(j * 22 + width / 2 - 160 + index * 200 + positionX, ((i * 22)) - 300, 14, {
                        restitution: 1,
                        timeScale: 1,
                        friction: 0
                    }))
                }
            });
        });
    })
    return matter_data
}

setInterval(() => {
    if(second()%15===0){
        _hour.push(make_num(nf(hour(), 2), -240))
        _minute.push(make_num(nf(minute(), 2), 240))
    }
}, 1000);

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    matter.init()
    matter.changeGravity(0, 1)

    floor = matter.makeBarrier(width / 2, height, width, 240)
}

function draw() {
    background(0)

    fill(0);
    floor.show();

    fill(255)
    noStroke()

    _hour.concat(_minute).forEach(element => {
        element.forEach(e => {
            if (0 < e.getX() && e.getX() < width) {
                matter.mouseInteraction(e)
                e.show()
            }else{
                matter.forget(e)
            }
        })
    });


    strokeWeight(10);
    textSize(28)
    textFont('Fragment Mono');


    textAlign(LEFT);
    text(`${hour()}:${nf(minute(), 2)}:${nf(second(), 2)}`, 40, height - 50)

    textAlign(RIGHT);
    let day_full = (new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date())).toUpperCase()
    let month_full = (new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date())).toUpperCase()
    text(`${month_full} ${day()}, ${day_full}`, width - 40, height - 50)


}
