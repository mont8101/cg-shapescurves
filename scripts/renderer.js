class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        return this.drawRectangle({x: 200, y: 150}, {x: 600, y: 500}, [18, 89, 255, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        return this.drawCircle({x: 400, y: 300}, 200, [1, 255, 3, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        return this.drawBezierCurve(150, 200, 150, 100, [1, 255, 3, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        this.drawLine({x: 200, y: 100}, {x: 400, y: 250}, [255, 255, 3, 255], ctx);
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        this.drawLine(left_bottom, {x: left_bottom.x, y: right_top.y}, color, ctx);
        this.drawLine({x: left_bottom.x, y: right_top.y}, right_top, color, ctx);
        this.drawLine(right_top, {x: right_top.x, y: left_bottom.y}, color, ctx);
        this.drawLine({x: right_top.x, y: left_bottom.y}, left_bottom, color, ctx);
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        let tot_pts = this.num_curve_sections;  
        let deg = 0;
        let deg_inc = 360/tot_pts;
        let nextX = center.x + radius * Math.cos(360);
        let nextY = center.y + radius * Math.sin(360);

        for(let i = 0; i < tot_pts; i++){
                let x0 = nextX
                let y0 = nextY
                deg = deg + deg_inc;
                let x1 = center.x + radius * Math.cos(deg);
                let y1 = center.y + radius * Math.sin(deg);
                this.drawLine({x: x0, y: y0}, {x: x1, y: y1}, [0, 255, 0, 255], ctx);
                nextX = x1;
                nextY = y1;
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
