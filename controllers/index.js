var mangMenu = []
function LoadMenu() {
    //Goi axios lay du lieu tu api ve
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyMenu/LayDanhSachMenu',
        method: 'get',
        responseType: 'json'
    });
    promise.then(renderMenu).catch(function (error) {
        console.log(error.response.data);
    });
}
//call-back function duoc goi trong ham tu promise sau khi goi api
function renderMenu(result) {
    console.log(result.data);
    //render data tu api tra ve
    mangMenu = result.data;
    var contentMenu = '';
    for (var i = 0; i < mangMenu.length; i++) {
        var menu = mangMenu[i];
        console.log(menu);
        contentMenu += `
        <div class="row">
            <div class="col-md-12">
                <h3>${menu.TenDanhMuc} <i class="edit" data-toggle="modal" data-target="#modalSuaMenu" onclick="capNhatMonAn('${i}')">sửa</i> <i class="delete" onclick="xoaMenu('${menu.MaDanhMuc}')">xóa</i></h3>
                <div class="row">
                    ${renderMenuItem(menu.DanhSachMonAn)}
                </div>
            </div>
        </div>
        `
    }
    document.getElementById('content-menu').innerHTML = contentMenu;
};

//Dinh nghia ham xoa menu
function xoaMenu(maDanhMuc) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyMenu/delete?maDanhMuc=' + maDanhMuc,
        method: 'DELETE',
        responseType: 'json'
    })
    promise.then(function (result) {
        LoadMenu();
    }).catch(function (error) {
        console.log(error.response.data);
    });
}
function renderMenuItem(mangDanhSachMonAn) {
    console.log(mangDanhSachMonAn);
    var contentMenuItem = '';
    //Duyet thuoc tinh mang mon an cua menu
    for (var i = 0; i < mangDanhSachMonAn.length; i++) {
        var monAn = mangDanhSachMonAn[i];
        contentMenuItem += `
        <div class="col-6">
            <p>${monAn.TenMonAn}</p>
        </div>
        <div class="col-2">
            <img src="${monAn.HinhAnh}" width = 50/>
        </div>
        <div class="col-4">
            <p>${monAn.Gia}</p>
        </div>
        `
    }
    return contentMenuItem;
}
LoadMenu();

//Chuc nang Them menu
document.getElementById("btn-themMenu").onclick = function () {
    var menuDatapost = new Menufood();
    menuDatapost.MaDanhMuc = document.getElementById('MaDanhMuc').value;
    menuDatapost.TenDanhMuc = document.getElementById('TenDanhMuc').value;
    menuDatapost.HinhAnh = document.getElementById('HinhAnh').value;
    //Them du lieu vao thuoc tinh DanhSachMonAn
    //B1: Duyet cac div mon-an
    var arrDivMonAn = document.querySelectorAll('.mon-an');
    for (var i = 0; i < arrDivMonAn.length; i++) {
        var tagMonAn = arrDivMonAn[i];
        //Tu tag mon an lay cac input mon an them vao mang
        var maMonAn = tagMonAn.querySelector('.maMonAn').value;
        var tenMonAn = tagMonAn.querySelector('.tenMonAn').value;
        var gia = tagMonAn.querySelector('.gia').value;
        var hinhAnh = tagMonAn.querySelector('.hinhAnh').value;
        //Them vao mang menuDataPost.DanhSachMonAn thong qua phuong thuc themMonAn
        menuDatapost.themMonAn(maMonAn, tenMonAn, hinhAnh, gia);
    }

    //Goi api backend
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/quanlymenu/taomenu',
        method: 'post',
        data: menuDatapost,
        responseType: 'json'
    });
    promise.then(function (result) {
        console.log(result);
        //Luu thanh cong thi load lai trang dong thoi lay data moi tu api ve thong qua ham LoadMenu
        location.reload();
        //Cach2: Goi ham load lai menu khong can load lai ca trang
    }).catch(function (error) {
        console.log(error.response.data);
    })
}
//Dinh nghia su kien click cho nut button them mon
document.getElementById('btnThemMon').onclick = function () {
    //tao ra noi dung cac row chua input thong tin mon an
    var divMonAn = `
    <div class="mon-an">
        <div class="form-group row">
            <div class="col-6 mt-2">
                <input class="form-control maMonAn" placeholder="Mã món" />
            </div>
            <div class="col-6 mt-2">
                <input class="form-control tenMonAn" placeholder="Tên món" />
            </div>
            <div class="col-6 mt-2">
                <input class="form-control gia" placeholder="Giá món" />
            </div>
            <div class="col-6 mt-2">
                <input class="form-control hinhAnh" placeholder="Link hình" />
            </div>
            </div>
            <div class="text-right">
                <button class="btnXoaMon btn-danger"> Xóa </button>
            </div>
    </div>
    `
    //dom den div danh sach mon an
    document.querySelector('.danh-sach-mon-an').innerHTML += divMonAn;
    //Goi ham dinh nghia su kien lai cho nhung nut .btnXoaMon
    createEventBtnXoaMon();
}
document.getElementById('btnThemMonChinhSua').onclick = function () {
    //tao ra noi dung cac row chua input thong tin mon an
    var divMonAn = `
    <div class="mon-an-chinh-sua">
        <div class="form-group row">
            <div class="col-6 mt-2">
                <input class="form-control maMonAn" placeholder="Mã món" />
            </div>
            <div class="col-6 mt-2">
                <input class="form-control tenMonAn" placeholder="Tên món" />
            </div>
            <div class="col-6 mt-2">
                <input class="form-control gia" placeholder="Giá món" />
            </div>
            <div class="col-6 mt-2">
                <input class="form-control hinhAnh" placeholder="Link hình" />
            </div>
            </div>
            <div class="text-right">
                <button class="btnXoaMon btn-danger"> Xóa </button>
            </div>
    </div>
    `
    //dom den div danh sach mon an
    document.querySelector('.danh-sach-mon-an-chinh-sua').innerHTML += divMonAn;
    //Goi ham dinh nghia su kien lai cho nhung nut .btnXoaMon
    createEventBtnXoaMon();
}
function createEventBtnXoaMon() {
    //Duyet tat ca cac nut xoa
    var arrBtnxoamon = document.querySelectorAll('.btnXoaMon');
    for (var i = 0; i < arrBtnxoamon.length; i++) {
        var btnXoa = arrBtnxoamon[i];
        btnXoa.onclick = function () {
            //Xu ly su kien nut xoa de xoa div .mon-an
            //this la nut button dang duoc dinh nghia su kien onclick
            this.closest('.mon-an').remove();
        }
    }

}
function createEventBtnXoaMonChinhSua() {
    //Duyet tat ca cac nut xoa
    var arrBtnxoamon = document.querySelectorAll('.btnXoaMon');
    for (var i = 0; i < arrBtnxoamon.length; i++) {
        var btnXoa = arrBtnxoamon[i];
        btnXoa.onclick = function () {
            //Xu ly su kien nut xoa de xoa div .mon-an
            //this la nut button dang duoc dinh nghia su kien onclick
            this.closest('.mon-an-chinh-sua').remove();
        }
    }
}

//Xây dựng chức năng cập nhật 
//B1: Đưa dữ liệu lên input
function capNhatMonAn(index) {
    //Đưa dữ liệu vào input của Menu(MaDanhMuc, TenDanhMuc, HinhAnh)
    var mangMENU = mangMenu[index];
    document.getElementById('MaDanhMucChinhSua').value = mangMENU.MaDanhMuc;
    document.getElementById('TenDanhMucChinhSua').value = mangMENU.TenDanhMuc;
    document.getElementById('HinhAnhChinhSua').value = mangMENU.HinhAnh;
    document.getElementById('MaDanhMucChinhSua').setAttribute("readonly", true);

    //Lấy mảng món ăn duyệt để hiện số lượng div-mon-an-chinh-sua theo length của mảng món ăn
    var mangDanhSachMonAn = mangMenu[index].DanhSachMonAn;
    console.log(mangDanhSachMonAn);
    var divsuaMonAn = '';
    for (var i = 0; i < mangDanhSachMonAn.length; i++) {
        divsuaMonAn += `
    <div class="mon-an-chinh-sua">
        <div class="form-group row">
            <div class="col-6 mt-2">
                <input class="form-control maMonAn" placeholder="Mã món" value="${mangDanhSachMonAn[i].MaMonAn}"/>
            </div>
            <div class="col-6 mt-2">
                <input class="form-control tenMonAn" placeholder="Tên món" value="${mangDanhSachMonAn[i].TenMonAn}"/>
            </div>
            <div class="col-6 mt-2">
                <input class="form-control gia" placeholder="Giá món" value="${mangDanhSachMonAn[i].Gia}"/>
            </div>
            <div class="col-6 mt-2">
                <input class="form-control hinhAnh" placeholder="Link hình" value="${mangDanhSachMonAn[i].HinhAnh}"/>
            </div>
            </div>
            <div class="text-right">
                <button class="btnXoaMon btn-danger">Xóa</button>
            </div>
    </div>
    `
        document.querySelector('.danh-sach-mon-an-chinh-sua').innerHTML = divsuaMonAn;
        createEventBtnXoaMonChinhSua();
    }
}

//B2: Bắt sự kiện cho nút cập nhật
document.getElementById('btn-capNhat').onclick = function () {
    menuCapNhat = new Menufood();
    menuCapNhat.MaDanhMuc = document.getElementById('MaDanhMucChinhSua').value;
    menuCapNhat.TenDanhMuc = document.getElementById('TenDanhMucChinhSua').value;
    menuCapNhat.HinhAnh = document.getElementById('HinhAnhChinhSua').value;
    console.log(menuCapNhat.MaDanhMuc);
    var arrDivMonAn = document.querySelectorAll('.mon-an-chinh-sua');
    for (var i = 0; i < arrDivMonAn.length; i++) {
        var tagMonAn = arrDivMonAn[i];
        //Tu tag mon an lay cac input mon an them vao mang
        var maMonAn = tagMonAn.querySelector('.maMonAn').value;
        var tenMonAn = tagMonAn.querySelector('.tenMonAn').value;
        var gia = tagMonAn.querySelector('.gia').value;
        var hinhAnh = tagMonAn.querySelector('.hinhAnh').value;
        //Them vao mang menuDataPost.DanhSachMonAn thong qua phuong thuc themMonAn
        menuCapNhat.themMonAn(maMonAn, tenMonAn, hinhAnh, gia);
        var promise = axios({
            method: 'PUT',//Phuong thuc doc du lieu backend cung cap
            url: 'http://svcy.myclass.vn/api/QuanLyMenu/CapNhatMenu',
            data: menuCapNhat,
            responseType: 'json'
        })
        promise.then(function (result) {
            location.reload();
        }).catch(function (error) {
            //Xu ly that bai
            console.log(error.response.data);
        });
    }

}



