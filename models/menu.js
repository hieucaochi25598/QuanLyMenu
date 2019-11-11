function Menufood(){
    this.MaDanhMuc = '';
    this.TenDanhMuc = '';
    this.HinhAnh = '';
    this.DanhSachMonAn = [];
    this.themMonAn = function(maMonAn, tenMonAn, hinhAnh, gia){
        var monAn = {
            "MaMonAn": maMonAn,
            "TenMonAn": tenMonAn,
            "HinhAnh": hinhAnh,
            "Gia": gia
        }
        this.DanhSachMonAn.push(monAn);
    }
}