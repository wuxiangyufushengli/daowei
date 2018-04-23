(function () {

    //头部导航
   $('.navbar-nav li>a').click(function () {
       $(this).parent('li').siblings().children().css({
           color:'black'
       })
       $(this).css({
           color:'red'
       })
   });
    $('.navbar-nav li').first().click(function () {
        window.location.href="index.html"
    })


    $(function () {
        $.ajax({
            type:'get',
            url:'http://localhost:3001/index',
            success:function (msg) {
                //创建box1
                 var box1='';
                 for(var i=0;i<msg.length;i++){
                   box1+='<div class="box1">'
                         +'<div class="fff">'
                         +'<div class="servicebody">'
                         +'<div class="navigation">'
                         +'<span class="serviceIndex"></span>'
                         +'<span class="serviceType">'

                         +'</span>'
                         +'</div>'
                         +'<div class="lookMore">更多服务<span class="iconfont icon-youjiantou"></span></div>'

                     +'</div>'
                     +'<div class="servicetags">'
                         +'<div class="row1">'

                         +'</div>'
                         +'</div>'
                         +'</div>'
                         +'</div>'

                 };
                //给box1添加内容
               $('.bannnerWrapper').after(box1);
                function list(index) {
                    var server=msg[index].shopList;
                    $('.box1').eq(index).find('.serviceIndex').append(msg[index].serviceIndex);
                    var title='';
                    for(var i=0;i<msg[index].serviceType.length;i++){
                        title+= '<a href="javascript:;">'+msg[index].serviceType[i]+'</a>&nbsp;'
                    }
                    $('.box1').eq(index).find('.serviceType').append(title)

                    var shofList='';
                    for(var i=0;i<server.length;i++){
                        shofList+='<div class="shofList">'
                            +'<img src="'+server[i].imgUrl+'">'
                            +'<div class="serviceName">'+server[i].serviceName+'</div>'
                            +'<div class="description">'+server[i].description+'</div>'
                            +'<div class="price">'
                            +'<span>'+server[i].price+'</span>'
                            +'<span>元/小时</span>'
                            +'<span class="btn1">查看详情</span>'
                            +'</div>'
                            +'</div>'
                    }
                    $('.box1').eq(index).find('.row1').append(shofList)
                };
                for(var i=0;i<msg.length;i++){
                    list(i)
                };
               //创建导航li
               var li='';
               for(var i=0;i<msg.length;i++){
                   li+='<li>'
                   +'<span>'+msg[i].serviceIndex+'</span>'
                   +'<a class="iconfont icon-youjiantou" href="javascript:;"></a>'
                    +'</li>'
               }
               $('.bannner').append(li);
                //右边导航显示
                $('.bannner').on('mouseover','li',function () {
                   var index=$(this).index();
                    var list=msg[index].serviceType;
                    var li=''
                    for(var i=0;i<list.length;i++){
                        li+= '<li>'
                        +'<span>'+list[i]+'</span>'
                        +'</li>'
                    }
                    $('.bannner-right').append(li)
                });
                $('.bannner').on('mouseout','li',function () {

                    $('.bannner-right').empty(li)
                })




            }
        });
    });

    $(window).scroll(function () {
        var scrolltop = $(document).scrollTop();
        if(scrolltop>100){
            $('.header').addClass('fixed').addClass('fixed-animated');

        }else if(scrolltop==0) {
            $('.header').removeClass('fixed');
            $('.header').removeClass('fixed-animated')


        }
    });
  //导航变色
   $('.bannner').on('mouseover','li',function () {
       $(this).addClass('bg')
       $('.bannner-right').show();
       $(this).children('a').removeClass('icon-youjiantou').addClass('icon-zuojiantou').css({
           position:'relative',
           right:-60
       });
   });
    $('.bannner').on('mouseout','li',function () {
        $('.bannner-right').hide();
        $(this).removeClass('bg');
        $(this).children('a').removeClass('icon-zuojiantou').addClass('icon-youjiantou').css({
            position:'relative',
            right:0
        })
    })

  //阴影

    shawB('.shofList');
    function shawB(item) {
        $(document).on("mouseover",item,function(){
            $(this).css({
                boxShadow: '5px 5px 15px #ccc'
            })
        });
        $(document).on("mouseout",item,function(){
            $(this).css({
                boxShadow: '0px 0px 0px #FFFFFF'
            })
        })

    };
    $('.left').on("mouseover",'li',function(){
        $(this).css({
            boxShadow: '5px 5px 15px #ccc'
        })
    });
    $('.left').on("mouseout",'li',function(){
        $(this).css({
            boxShadow: '0px 0px 0px #FFFFFF'
        })
    })




    //服务商

    $.ajax({
        type:'get',
        url:'http://localhost:3001/service',
        async: false,
        success:function (msg) {
            serlist=msg;

        }
    });
    //点击加载更多
    $('.btn2').click(function () {
        $.ajax({
            type:'get',
            url:'http://localhost:3001/service',
            async: false,
            success:function (msg) {
                $('.left').append(listT)

            }
        });

    });
    //点击服务商进去下一个页面


    $('.left').on('click','li',function () {
        var index=$(this).index();
        var id=serlist[index].id;
        console.log(id)
        window.location.href="serverlist.html?id="+id
    })

    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }


    //请求详情页信息
     $('.item_list').first().on('mouseover','.serverContent:eq(1)',function () {

         $(this).css({
             background:'#F8F8F8'
         })
     });
    $('.item_list').first().on('mouseout','.serverContent:eq(1)',function () {

        $(this).css({
            background:'white'
        })
    })




    $.ajax({
        type:'get',
        url:'http://localhost:3001/item',
        async: false,
        success:function (msg) {
            console.log(msg)
            var id =  GetQueryString("id");
            var serMsg=''
            for(var j=0;j<msg.length;j++){

                var mm = msg[j];
                if(mm.id==id){
                    var info='<div>'+mm.name+'</div>'
                    +'<div>'+mm.servedes+'</div>'
                    +'<div class="price">'
                        +'<b>'+mm.price+'<em>元/小时</em></b>'
                    +'<span class="oldPrice">原价<em>'+mm.oldPrice+'</em></span>'
                    +'</div>'
                    +'</div>'
                    +'<span class="saleCount">已售'+mm.orderCount+'</span>';
                    $('.imgage').append('<img src="'+mm.imgUrl +'">')
                }
            }
            $('.spm2').append(info);



        }
    });


    //请求评论信息

      comment(0);
      function comment(index) {
          $.ajax({
              type:'get',
              url:'http://localhost:3001/comment',
              async: false,
              success:function (msg) {
                  //console.log(msg);
                  var start=index*10;
                  var end=(index+1)*10
                  msg=msg.slice(start,end);
                  //console.log(msg)

                 var obj={ratings:msg};
                  var comT=template('test2',obj);
                  $('.rats').append(comT)
              }

          })
      }

   //每一页
     $('.number').click(function () {
         $(".rats").empty()
       var index=$(this).index();
      // console.log(index)
         comment(index);
         $(this).siblings().removeClass('select')
        $(this).addClass('select')
     });
     // 上一页
      $('.pre').click(function () {
          var dom=$('.number').filter('.select');
          var index= $(dom).index();
          $(".rats").empty();

          var currentindex=index-1;
          console.log(index)
          console.log(currentindex)
          comment(currentindex-1);
          $($('.number')[currentindex-1]).siblings().removeClass('select')
          $($('.number')[currentindex-1]).addClass('select')
      });
      //下一页
      $('.next').click(function () {
          var dom=$('.number').filter('.select');
          var index= $(dom).index();
          $(".rats").empty();

          var currentindex=index+1;
          console.log(index)
          console.log(currentindex)
          comment(currentindex+1);
          $($('.number')[currentindex-1]).siblings().removeClass('select')
          $($('.number')[currentindex-1]).addClass('select')
      });


   //获取当前的路由路径
    var path=window.location.pathname+location.search;
    console.log(path)
    var pathid=path.slice(23);
    console.log(pathid)
    $('.serverContent').click(function () {
        window.location.href='serverdetail.html'+pathid;
    });

    $.ajax({
        type:'get',
        url:'http://localhost:3001/item',
        async: false,
        success:function (msg) {
            console.log(msg)
            var id = GetQueryString("id");
            for(var i=0;i<msg.length;i++){
                if(msg[i].id==id){
                    console.log(msg[i]);
                    var items=[msg[i]]
                    var obj={items:items};
                    var comT=template('test3',obj);

                    $('.content').append(comT)


                }
            }




        }


    })
    
    
    

})(

)