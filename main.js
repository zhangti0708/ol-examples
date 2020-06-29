/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: zhangti
 * @Date: 2018-07-21 07:07:40
 * @LastEditors: zhangti
 * @LastEditTime: 2020-05-13 18:12:38
 */

import xMap from 'xxmap/api/xMap'
let initMap = async function () {
  let x = await xMap.init('map')
  // ,[{
  //   layerName: 'TileXYZ',
  //   isDefault: true,
  //   layerType: 'TileXYZ',
  //   projection: 'EPSG:3857',
  //   layerUrl: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
  //   //'https://s{1-5}.geohey.com/s/mapping/midnight/all?x={x}&y={y}&z={z}&retina=&ak=ZmI0YmI5MWE4NjEyNDlkNTkxY2NmNmQ1NDYwOWI5ZmU'
  // }]
  //new x.MeasureHelper(x.getMap()).createMeasurePanel();

  //new x.PlotHelper(x.getMap()).createPlotPanel();

  //new x.RightMenuManager(x.getMap()).initMenu()

  // new x.MapTools(x.getMapViewer()).layerMagnify({
  //    magnifyLayer : x.getMapViewer().getLayerByLayerName('GaoDe')
  // })
  // new x.MapTools(x.getMapViewer()).LayerSpyglass({
  //   spyLayer : x.getMapViewer().getLayerByLayerName('GaoDe')
  // })
  //new x.MapTools(x.getMapViewer()).compareLayer()
  // new x.MapTools(x.getMapViewer()).layerSwitch()
  // new x.MapTools(x.getMapViewer()).mouseInfo()
  //console.log(new x.LayerManager(x.getMap()).getLayerHelper())
  window.moduleSelect = function (_module) {
    if (!_module) return false;
    switch (_module) {
      case 'echarts': x.createThematicMapManager().createEchatsDemo2(); break;
      case 'winds': x.createVisualManager().createWinds(); break;
      case 'addlayer': x.createLayerManager().createLayuiLayerPanel(); break;
      case 'controls': x.createViewControl().createLayuiControlsPanel(); break;
      case 'plot': x.createPlot().createLayuiPlotPanel(); break;
      case 'measure': x.createMeasure().createLayuiMeasurePanel(); break;
    }
  }
}
setTimeout(() => {
  initMap()
}, 200)

// //导入API模块
// import zkMap from 'zkMap';
// /**
//  * 初始化api对象
//  * ————------
//  * 默认初始化二维api
//  * 初始化完成返回API对象：mapApi
//  * 所有模块通过 mapApi 创建-生成-调用
//  * 
//  */
// var initMap = async function () {
//   const DEF_OPT = {}
//   /**
//    * @param divId 地图容器id
//    * @param DEF_OPT 初始化参数 不传入有默认值。可以自定义
//    * @return 地图api对象 用于子模块的调用生成
//    */
//   let mapApi = await zkMap.init('map', ...DEF_OPT);

//   /**
//    * 图层管理器模块示例
//    * --- 获取管理器对象
//    * --- 添加一组底图
//    * --- 动态设置底图基本属性
//    * --- 创建图层切换控件
//    */
//   //获取图层管理器
//   let layerMananger = mapApi.getLayerManager();
//   /**
//    * 1.添加一组底图
//    * @param baseLayers
//    *   baseLayers=[{layerParam},{layerParam},{layerParam}]
//    * @param layerParam
//    *   layerParam={layerName,layerUrl,layerOption,visible}
//    * @reutrn 返回当前的图层组对象
//    * 
//    * 2.动态设置属性
//    * @param option 
//    *   option = {alpha:1,visible:true}
//    * @reutrn 当前对象
//    * 
//    * 3.创建底图切换控件
//    * @param status false|true 显隐状态 默认true
//    * @return 当前对象
//    */
//   layerMananger.addBaseLayers(...baseLayers).setOptions(...option).createLayerSwitch(...status);

//   /**
//    * 图层管理器模块示例 2
//    * --- 获取图层工厂创建图层
//    * --- 创建一个目标图层
//    * --- 添加到图层组
//    * --- 动态设置图层样式
//    * --- 动态设置图层属性
//    */
//   /**
//    * 1.获取图层工厂对象，用于创建图层
//    * @return layerFactory
//    * 
//    * 2.创建layerBean对象，传入需要添加的图层属性
//    * @param layername 图层名称:'xx战略图层'  标识图层的可用于图层组管理
//    * @param layerParam 创建图层的参数
//    * layerParam={
//    *    layerUrl, //数据源
//    *    layerType,//图层类型
//    *    format, //数据格式
//    *    style,  //样式函数 非必须 默认
//    *    projection,投影坐标 非必须
//    *    visible, //是否可见 非必须
//    *    layerOption //layer可选项,
//    *    addGroup,//默认添加到图层组 根据类型创建 显示name
//    *  }
//    * @reutrn 当前图层对象
//    * 
//    * 3.动态设置图层样式
//    *  @param style 样式函数 自定义样式
//    *  @reutrn 当前对象
//    * 
//    * 4.动态设置图层属性
//    * @param option 图层基本属性 可见-亮度-对比度-饱和度
//    *  option = {show: true, Alpha: 1, Brightness: 5, Contrast: 3, Saturation: 2,}
//    */
//   layerMananger.getLayerFactory().createLayerBean(layername, ...layerParam).setStyle(...style).setOptions(...option);

//   /**
//    * 图层管理器模块示例 3
//    * * 按照需求
//    * * 这个地方直接给指定图层操作
//    * --- 给图层绑定一个要素
//    * --- 动态设置要素样式并获取坐标点
//    * --- 给图层添加一个悬浮物
//    * --- 动态设置悬浮物属性
//    * 1.给图层绑定要素
//    * @param layerName 图层名称：'xx战略图层'
//    * @param featureParam 要素参数 name 必需 'xx目标点'
//    *  //名称 坐标数据 要素类型 要素样式 是否可见 要素选项
//    *  featureParam = {name：'xx目标点',data：[xx,xx],type:'point',style:function,visible:true,option:[]} 
//    * @return 当前要素对象
//    * 
//    * 2.动态设置要素样式并获取坐标点
//    * @param option 要素基本属性
//    *  option = {visible:false,style:function}
//    * @reutrn 当前要素对象
//    */
//   layerMananger.addFeature(layerName,...featureParam).setOptions(...option).getCoordinates();

//   /**
//    * 标绘模块示例
//    * --- 获取标绘辅助
//    * --- 绘制指定类型标绘
//    * --- 修改标绘样式
//    * --- 获取标绘的几何属性
//    */
//   //获取标绘辅助对象
//   let plotHelper = mapApi.getPlotHelper();
//   /**
//    * 1.启动画笔绘制标绘
//    * @param type 标绘类型 type:'狙击地'
//    * @param option 属性选项 option = {name,style} //非必须
//    * @return 返回标绘的对象
//    * 
//    * 2.动态设置样式
//    * @param plotStyle 样式函数 ： 自定义标绘的样式
//    * 
//    * 3.获取标绘的几何属性
//    * @reutrn Geometry
//    */
//   plotHelper.draw(...type,...option).setStyle(...plotStyle).getGeometry();
//   /**
//    * 右键菜单模块示例
//    * --- 获取菜单管理对象
//    * --- 初始化默认菜单
//    * --- 添加自定义菜单
//    * --- 设置菜单样式
//    */
//   //获取菜单管理对象
//   let rightMenuManager = mapApi.getRightMenuManager();
//   /**
//    * 1.初始化默认菜单
//    *  默认启动菜单
//    * @return 当前对象
//    * 
//    * 2.添加一组自定义菜单
//    * @param menuParams 自定义参数
//    *   menuParam = [{
//    *     name: "测规则面", //名称
//    *     alias: "measureLength", //关联功能
//    *     iconType: "iconfont", //图标
//    *     icon: "icon-ceju",
//    *     iconColor: "#2994EF"
//    * }]
//    * 
//    * 3.设置菜单样式
//    * @param menuStyle 菜单样式属性
//    *  menuStyle : 样式预设标识 默认预设有几套样式
//    */
//   rightMenuManager.addMenuGroup(...menuParams).setMenuStyle(...menuStyle)
 




// }