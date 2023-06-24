
function Footer() {
  return (
    <div className="footer-container">
      { <footer class="footer">
                <div class="container">
                <div class="row">
                        <div class="col-md-6 col-lg-4 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left mr-auto">
                        <div class="footer-widget">
                                <h4 class="mb-4">Sách hay</h4>
                                <p class="lead">Đọc để bạn tìm được chính mình biết yêu thương vượt lên mọi khó khăn trong cuộc sống</p>
                                
                                <div class="">
                                    <p class="mb-0"><strong>Vị trí : </strong>Vietnam</p>
                                    <p><strong> Email hỗ trợ : </strong> support@email.com</p>
                                </div>
                        </div>
                        </div>
            
                        <div class="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
                            <div class="footer-widget">
                            <h4 class="mb-4">Thể loại</h4>
                            <ul class="pl-0 list-unstyled mb-0">
                            <li><a href="./">Văn học</a></li>
                            <li><a href="./">Kinh tế</a></li>
                            <li><a href="./">Thiếu nhi</a></li>
                            <li><a href="./">Tiểu sử - hồi ký</a></li>
                            <li><a href="./">Nuôi dạy con</a></li>
                            </ul>
                        </div>
                        </div>
            
                        <div class="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
                            <div class="footer-widget">
                            <h4 class="mb-4">Liên kết hữu ích</h4>
                            <ul class="pl-0 list-unstyled mb-0">
                            <li><a href="./">Mới &amp; Mẹo</a></li>
                            <li><a href="./">Về chúng tôi</a></li>
                            <li><a href="./">Hỗ trợ</a></li>
                            <li><a href="./">Cửa hàng</a></li>
                            <li><a href="./">Liên hệ</a></li>
                            </ul>
                                </div>
                        </div>
            
                        <div class="col-md-6 col-lg-3 col-sm-6 text-center text-sm-left">
                            <div class="footer-widget">
                            <h4 class="mb-4">Giờ mở cửa</h4>
                            <ul class="pl-0 list-unstyled mb-5">
                            <li class="d-lg-flex justify-content-between">Thứ 2-Thứ 6 <span>8.00-20.00</span></li>
                            <li class="d-lg-flex justify-content-between">Thứ 7 <span>10.00-20.00</span></li>
                            <li class="d-lg-flex justify-content-between">Chủ nhật <span>12-20.00</span></li>
                            </ul>
            
                            <h5>Gọi ngay : +(000) 000-000</h5>
                        </div>
                        </div>
                    </div>
                </div>
            </footer>
             }

      <div
        class="footer-btm py-4"
        // style={{
        //   backgroundColor: "red",
        // }}
      >
        <div class="container">
          <div class="row ">
            <div class="col-lg-12">
              <ul class="list-inline mb-0 footer-btm-links text-lg-right mt-2 mt-lg-0 text-white">
                <li class="list-inline-item">
                  <a href="./">Chính sách bảo mật</a>
                </li>
                <li class="list-inline-item">
                  <a href="./">Điều khoản và điều kiện &amp; Điều kiện</a>
                </li>
                <li class="list-inline-item">
                  <a href="./">Chính sách cookice</a>
                </li>
                <li class="list-inline-item">
                  <a href="./">Điều khoản bán hàng</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-12 col-sm-6 mb-5 mb-lg-0 text-center">
              { <p class="copyright mb-0 "><span>@ Copyright</span> Reserved to therichpost &amp; made by <a href="https://therichpost.com/">therichpost</a></p> }
            </div>
    </div>
  );
}
export default Footer;
