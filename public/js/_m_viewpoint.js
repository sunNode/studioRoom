$("#ViewPoint_List").mCustomScrollbar({scrollButtons:{enable:true}});$("#ViewPoint_Zoom").mouseout(function(){if($(this).hasClass("on")){$(this).removeClass("on")}});if(iInfo.IsManager||iInfo.IsZber){$("#ViewPoint a.Del").show();$("#ViewPointPub").fancybox({"titleShow":false,"autoDimensions":false,"autoScale":false,"height":295,"type":"iframe"})}function ViewPoint_Add(e){if(!(iInfo.IsManager||iInfo.IsZber)){iTip("你无权发布讲师观点！");return}var o={};o.Type="CMD_ViewPoint_Add";o.ReceiveRID=iInfo.Live_NG_ID;o.PostUID=iInfo.UserID;o.PostUName=iInfo.UserNickName;o.PostPower=iInfo.Power;o.ReceiveUID=_Config.ToPersonUID;o.ReceiveUName=_Config.ToPersonUName;o.Time=GetSendTime();o.Msg=e.Msg;o.ViewPointGrade=e.ViewPointGrade;o.MD5=e.MD5;o.Checked=true;PostMsg(o)}function GetGradeEN(num){var re="low";if(num==0){re="low"}else{if(num==1){re="middle"}else{re="high"}}return re}function GetGradeCN(num){var re="低";if(num==0){re="低"}else{if(num==1){re="中"}else{re="高"}}return re}function AddViewPoint(e){if($("tr[t='ViewPoint"+e.MD5+"']").length>0){return}var now=new Date();var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];var trid="td-date-"+now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();var trhtml='<tr id="'+trid+'"><td colspan="4" class="td-date"><strong>'+weekday[now.getDay()]+", "+now.getMonth()+"月"+now.getDate()+"</strong></td></tr>";if($("#"+trid).length<1){$("#ViewPoint_Tbody").prepend(trhtml)}var data_trhtml='<tr id="ViewPoint'+e.MD5+'" t="ViewPoint'+e.MD5+'"><td class="td-time">'+GetSendTime()+'</td><td><span class="td-grade '+GetGradeEN(e.ViewPointGrade)+'" title="'+GetGradeCN(e.ViewPointGrade)+'">&nbsp;</span></td><td class="td-content"><a href="javascript:void(0)">'+unescape(unescape(e.Msg))+'</a></td><td><a class="Del" href="javascript:void(0)" onclick="ViewPoint_Del(\''+e.MD5+"')\">删除</a></td></tr>";$(data_trhtml).insertAfter($("#"+trid));if(iInfo.IsManager){$("#ViewPoint a.Del").show()}$(".ViewPointBT_N").css({visibility:"visible"});$("#ViewPoint_List").mCustomScrollbar("update")
}function ViewPoint_Del(id){if(!(iInfo.IsManager||iInfo.IsZber)){iTip("你无权进行删除！");return}if($.isNumeric(id)==false&&$("tr[t='ViewPoint"+id+"']").length<1){iTip("非法操作！");return}if(confirm("是否删除此观点？")){id=String(id);var o={};o.Type="CMD_ViewPoint_Del";o.ReceiveRID=iInfo.Live_NG_ID;o.ViewPointID=id;o.MD5=id;$.get("/Handle/DelViewPoint.asp",{ac:"DelViewPoint","id":id,rid:iRoomID,t:GetSendTime()},function(){if(DelViewPointRe==true){PostMsg(o)}else{iTip(DelViewPointRe)}},"script")}else{return}}function DelViewPoint(e){try{$("#ViewPoint"+e.ViewPointID).remove()}catch(err){}try{$("tr[t='ViewPoint"+e.MD5+"']").remove()}catch(err){}$("#ViewPoint_List").mCustomScrollbar("update")}function ShowViewPointZoom(){$("#ViewPoint_Zoom").addClass("on");setTimeout(function(){$("#ViewPoint_Zoom").removeClass("on")},3000)};