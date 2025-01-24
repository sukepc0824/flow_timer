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
                        restitution: 0.9,
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
    _hour.push(make_num(nf(hour(),2), -240))
    _minute.push(make_num(nf(minute(),2), 240))
}, 15000);



function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    matter.init()
    matter.changeGravity(0, 1)

    floor = matter.makeBarrier(width / 2, height + 50, width, 100)
}

function draw() {
    background(0)

    fill(255)
    noStroke()

    _hour.concat(_minute).forEach(element => {
        element.forEach(e => {
            if (0 < e.getX() && e.getX() < width) {
                e.show()
            }
        })
    });

}
