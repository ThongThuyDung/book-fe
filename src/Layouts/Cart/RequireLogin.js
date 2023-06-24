function RequireLogin() {
  return (
    <div class="dropdown-menu cart-dropdown">
      <div class="cart-summary">
        <span class="h5">Please login before seeing items</span>
        <div class="text-center cart-buttons mt-3">
          {/* <a href="#" class="btn btn-small btn-transparent btn-block">
            View Cart
          </a> */}
          <a href="login" class="btn btn-small btn-main btn-block">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
export default RequireLogin;
