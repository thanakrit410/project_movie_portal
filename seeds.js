const   mongoose = require('mongoose'),
        showmovie = require('./models/showmovie'),
        Comment   = require('./models/comment');



const data = [

        {
            name:"BATMAN 2022",
		    date:"03-03-2022",
		    image:"https://www.beartai.com/wp-content/uploads/2022/03/The-Batman.jpg",
		    rate:"13+",
		    category:"Action",
		    timemovie:"176min",
		    Synopsis:"THE BATMAN เดอะ แบทแมน นั้นจากการเปิดเผยของผู้กำกับ แมตต์ รีฟส์ บอกไว้ว่า  ตลอดทั้งเรื่องแบทแมน (โรเบิร์ต แพตทินสัน) ต้องออกไปสืบสวนเหตุอาชญากรรมต่างๆ และเรื่องราวก็ชวนให้ตั้งคำถามไปเรื่อยๆ เกี่ยวกับตัวตนของเขา ที่มาของเขา และมรดกที่เขาได้จากพ่อ ",
		    trailer:"https://www.youtube.com/embed/s6ttqUweInc"
        },
        {
            name:"IRONMAN 3",
		    date:"03-04-2013",
		    image:"https://upload.wikimedia.org/wikipedia/th/d/d7/Iron_Man_3_teaser_poster.jpg",
		    rate:"13+",
		    category:"Action",
		    timemovie:"130min",
		    Synopsis:"โทนี่ สตาร์ค/ไอรอน แมน อัจฉริยะนักอุตสาหกรรมสุดเกรียน ตกอยู่ภายใต้หลุมพรางของศัตรูผู้ไม่รู้จักขอบเขตของคำว่าโหดร้าย เมื่อสตาร์คพบว่าโลกส่วนตัวของเขาได้ถูกทำลายลงด้วยเงื้อมมือของศัตรูเหล่านั้น เขาจึงออกตามล่าคนที่ต้องรับผิดชอบกับเหตุการณ์ที่เกิดขึ้นแบบพลิกแผ่นดิน ในทุกย่างก้าวของการเดินทางครั้งนี้ คือการทดสอบความเข้มแข็งของเขา เมื่อหลังชนฝา สตาร์คเอาตัวรอดมาได้โดยอุปกรณ์ต่าง ๆ ของเขาเอง สิ่งที่พึ่งพาได้ในตอนนี้ก็คือความเป็นนักประดิษฐ์และสัญชาตญาณ เพื่อจะปกป้องคนที่เขารัก เมื่อเขาลุกขึ้นสู้อีกครั้ง สตาร์คจึงได้พบกับคำตอบของคำถามที่คอยหลอกหลอนเขามาโดยตลอดว่า คนสร้างชุดเกราะหรือชุดเกราะสร้างคนกันแน่?",
		    trailer:"https://www.youtube.com/embed/yvas2Th6ZeA"
        },
        {
            name:"JonH Wick3",
		    date:"16-04-2019",
		    image:"https://upload.wikimedia.org/wikipedia/en/9/94/John_Wick_Chapter_3_Parabellum.png",
		    rate:"13+",
		    category:"Action",
		    timemovie:"131min",
		    Synopsis:"โดยในภาคนี้ จอห์น วิค อดีตนักฆ่าฝีมือฉกาจต้องเอาชีวิตรอดหลังเขาทำผิดกฎของโลกนักฆ่าและถูกตั้งค่าหัวเป็นเงิน 14 ล้านดอลลาร์สหรัฐ",
		    trailer:"https://www.youtube.com/embed/CpBpC63XpLw"
        }
    ];
function seedDB(){
    showmovie.remove({},function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log('Data removal complete');
            data.forEach(function(seed){
                showmovie.create(seed, function(err, showmovie){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log('New data Added');
                        /*Comment.create({
                                author:'aomsin',
                                text: 'This is my FAV'
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            }
                            else
                            {
                                showmovie.Comments.push(comment);
                                showmovie.save()
                            }

                        });*/   
                    }
                });
            });
        }
    });

}

module.exports = seedDB;