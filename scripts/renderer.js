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
        this.stack = [''];
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
        if(flag){
            document.getElementById("points").innerHTML = JSON.stringify(this.stack);
        }
        else{
            document.getElementById("points").innerHTML = "";
        }
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
        this.stack = [];
        return this.drawRectangle({x: 200, y: 150}, {x: 600, y: 500}, [18, 89, 255, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        this.stack = [];
        return this.drawCircle({x: 400, y: 300}, 200, [1, 255, 3, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        this.stack = [];
        return this.drawBezierCurve({x: 100, y: 100}, {x: 200, y: 700}, {x: 500, y: 600}, {x: 400, y: 100}, [1, 255, 3, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        this.stack = [];
        this.drawLine({x: 200, y: 100}, {x: 400, y: 250}, [255, 0, 0, 255], ctx);
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {       
        let point = {x: left_bottom.x, y: right_top.y};
        this.drawLine(left_bottom, point, color, ctx);
        
        point = {x: left_bottom.x, y: right_top.y};
        this.drawLine(point, right_top, color, ctx);
        
        point = {x: right_top.x, y: left_bottom.y};
        this.drawLine(right_top, point, color, ctx);
        
        point = {x: right_top.x, y: left_bottom.y};
        this.drawLine(point, left_bottom, color, ctx);
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        let tot_pts = this.num_curve_sections;  
        let deg = 0;
        let deg_inc = 360/tot_pts;
        let nextX = Math.round(center.x + radius * Math.cos(deg * Math.PI / 180));
        let nextY = Math.round(center.y + radius * Math.sin(deg * Math.PI / 180));

        for(let i = 0; i < tot_pts; i++){
                let x0 = nextX;
                let y0 = nextY;
                deg = deg + deg_inc;
                let x1 = Math.round(center.x + (radius * Math.cos(deg * Math.PI / 180)));
                let y1 = Math.round(center.y + (radius * Math.sin(deg * Math.PI / 180)));
                this.drawLine({x: x0, y: y0}, {x: x1, y: y1}, color, ctx);
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
        let tot_pts = this.num_curve_sections; 
        let t_chunk = 1/tot_pts;
        let t = 0;
        let nextX = Math.round(Math.pow(1-t, 3) * pt0.x + 3 * Math.pow(1-t, 2) * t * pt1.x + 3 * (1 - t) * Math.pow(t, 2) * pt2.x + Math.pow(t, 3) * pt3.x);
        let nextY = Math.round(Math.pow(1-t, 3) * pt0.y + 3 * Math.pow(1-t, 2) * t * pt1.y + 3 * (1 - t) * Math.pow(t, 2) * pt2.y + Math.pow(t, 3) * pt3.y);
        
        for(let i = 0; i < tot_pts; i++){
            let x0 = nextX;
            let y0 = nextY;
            t = t + t_chunk;
            let x1 = Math.round(Math.pow(1-t, 3) * pt0.x + 3 * Math.pow(1-t, 2) * t * pt1.x + 3 * (1 - t) * Math.pow(t, 2) * pt2.x + Math.pow(t, 3) * pt3.x);
            let y1 = Math.round(Math.pow(1-t, 3) * pt0.y + 3 * Math.pow(1-t, 2) * t * pt1.y + 3 * (1 - t) * Math.pow(t, 2) * pt2.y + Math.pow(t, 3) * pt3.y);
            this.drawLine({x: x0, y: y0}, {x: x1, y: y1}, color, ctx);
            nextX = x1;
            nextY = y1;
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        this.stack.push(pt0);
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
}
