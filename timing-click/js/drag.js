/*拖动*/
class DragObj {
    constructor(dom) {
        this.mouse = {
            x: 0,
            y: 0
        };
        this.obj = {
            x: 0,
            y: 0
        };
        this.isClicked = false;
        if(dom) {
            this.dom = dom;
        } else {
            throw new Error('不存在的dom节点');
        }
    }

    init(options={}) {
        document.addEventListener('mousedown', this.down.bind(this));
        document.addEventListener('mousemove', this.move.bind(this));
        document.addEventListener('mouseup', this.end.bind(this));
        if(typeof options.click ==='function') {
            this.clickCb = options.click;
        }
        if(typeof options.exclude === 'object') {
            this.excludeDom = options.exclude;
        }
        if(typeof options.include === 'object') {
            this.includeDom = options.include;
        }
    }

    down(event) {
        this.isClicked = true;
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
        this.obj.x = this.dom.offsetLeft;
        this.obj.y = this.dom.offsetTop;
    }

    move(event) {
        if(this.isClicked) {
            let moveX = event.clientX - this.mouse.x;
            let moveY = event.clientY - this.mouse.y;
            this.dom.style.left = `${this.obj.x+moveX}px`;
            this.dom.style.top = `${this.obj.y+moveY}px`;
        }
    }

    end(event) {
        this.isClicked = false;
        if(this.clickCb && (event.clientX === this.mouse.x && event.clientY===this.mouse.y)) {
            if(!this.excludeDom.contains(event.target) && this.includeDom.contains(event.target)) {
                this.clickCb(event);
            }
        }
    }
}