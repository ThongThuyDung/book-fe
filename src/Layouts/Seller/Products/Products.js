import {
  MDBCol,
  MDBInput,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
} from "mdb-react-ui-kit";
import React, { useState, useRef , useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
  getAllCategory,
  getProductByShop,
  apiCreateProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  getAllProduct
} from "../../../APIs/product.api";

function Products({ keyword, setKeyword }) {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShowAdd = () => setBasicModal(!basicModal);
  const [isEdit, setIsEdit] = useState(false);
  const toggleShowEdit = () => setIsEdit(!isEdit);
  useEffect(() => {
    getAllCategory(setListCategory);
    getProductByShop(setListProduct);
  }, []);

  const [inputSearch,setInputSearch] = useState('');
  const navigate = useNavigate();
  const [listCategory, setListCategory] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [file, setFile] = useState([]);
  const [data, setData] = useState({
    idCategory: '',
    name: '',
    price: '',
    description: '',
    quantity: '',
  });

  const [type, setType] = useState({
    id: '',
    name: '',
    author: '',
    publisher: '',
    yearPublisher: '',
    language:'',
    size:'',
    weight:'',
    numOfPages:''
  });

  const [dataUpdate, setDataUpdate] = useState({
    idCategory: '',
    idProduct: '',
    name: '',
    price: '',
    description: '',
    quantity: '',
    author: '',
    publisher: '',
    yearPublisher: '',
    language:'',
    size:'',
    weight:'',
    numOfPages:''
  });

  const [typeUpdate, setTypeUpdate] = useState({
    id: '',
    name: '',
    author: '',
    publisher: '',
    yearPublisher: '',
    language:'',
    size:'',
    weight:'',
    numOfPages:''
  });

  const [chooseImg, setChooseImg] = useState(false);
  const onImageChange = (e) => {
      setFile(e.target.files[0])
      setChooseImg(true)
  }
  useEffect(() =>{
    setListProducts(listProduct)
  })
 
  useEffect(() =>{
    if(inputSearch !== '')
    {
      setListProducts(listProduct.filter((item) => item.productResponse.name.includes(inputSearch)))
    }else {
      setListProducts(listProduct)
    }
  },[inputSearch,listProducts])

  const handleAdd = () => {
    const form_data = new FormData();
    form_data.append(
      "createProductRequest",
      new Blob([JSON.stringify(data)], {type: 'application/json'})
    );

    form_data.append(
      "listTypeRequests",new Blob([JSON.stringify(type)],{type: 'application/json'})
    )  
    form_data.append("listImg", file, {type: 'image/jpeg'})

    apiCreateProduct(form_data)
  }

  const handleUpdate = () => {
    const form_data = new FormData();
    form_data.append(
      "updateProductRequest",
      new Blob([JSON.stringify(dataUpdate)], {type: 'application/json'})
    );

    form_data.append(
      "listTypeRequests",new Blob([JSON.stringify(typeUpdate)],{type: 'application/json'})
    )  
    if(chooseImg){
      form_data.append("listImg", file, {type: 'image/jpeg'})
    }
  
    apiUpdateProduct(form_data)
  }
// console.log(listProduct)
  const handleDelete = (idProduct) =>{
    apiDeleteProduct(idProduct)
  }

  const elemCategory = listCategory.map((item, index) => {
    return (
      <option value={item.id} key={item.id}>
        {item.name}
      </option>
    );
  });

  const language = [{"name":"Tiếng Việt"},{"name":"Tiếng Anh"},{"name":"Tiếng Hàn"},{"name":"Tiếng Nhật"},{"name":"Tiếng Nga"}];
  const elemTypeLanguage = language.map((item, index) => {
    return (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    );
  });
  return (
  <div className="p-4 block">
      <div className="d-flex">
        <h4>Products</h4>
        <button type="button" class="btn btn-dark " style={{marginLeft : "80%", padding: "1px 20px", fontSize :"13px"}} name="add_product" disabled="" onClick={toggleShowAdd}>Add product</button>
      </div>
      <MDBCol className="mt-4" style={{marginLeft : "-15px"}}>
          <MDBCard className="mb-4">
            <MDBCardBody>
            <div class="container-fluid" style={{marginLeft : "110px"}}>
              <form class="d-flex w-75">
                  <input
                      type="Filter products"
                      class="form-control rounded"
                      placeholder="Filter products"
                      aria-label="Filter products"
                      aria-describedby="search-addon"
                      value={inputSearch}
                      onChange={(e) => {
                        setInputSearch(e.target.value);
                      }}
                      
                  />
              </form>
            </div>
              <MDBRow className="mt-4 ml-1">
                <MDBCol sm="1">
                  <MDBCardText></MDBCardText>
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>Product</MDBCardText>
                </MDBCol>
                <MDBCol sm="3">
                  <MDBCardText>Author</MDBCardText>
                </MDBCol>
                <MDBCol sm="1">
                  <MDBCardText>Category</MDBCardText>
                </MDBCol>
                {/* <MDBCol sm="1">
                  <MDBCardText>Type</MDBCardText>
                </MDBCol> */}
                <MDBCol sm="1">
                  <MDBCardText>Price</MDBCardText>
                </MDBCol>
                <MDBCol sm="1">
                  <MDBCardText>Quantity</MDBCardText>
                </MDBCol>
              </MDBRow>
              {listProducts.map((item, index) => (
              <MDBRow className="mt-4 ml-1 pt-4 border-top">
                <MDBCol sm="1">
                  <MDBCardImage
                      src={`https://res.cloudinary.com/dn0hpi4bc/image/upload/${item.urlImgList[0].url}`}
                      alt="avatar"
                      className=""
                      style={{ width: "50px" }}
                      fluid
                  />
                </MDBCol>
                <MDBCol sm="2">
                  <MDBCardText>{item.productResponse.name}</MDBCardText>
                </MDBCol>
                <MDBCol sm="3">
                  <MDBCardText>{item.productResponse.author}</MDBCardText>
                </MDBCol>
                <MDBCol sm="1">
                  <MDBCardText>{item.productResponse.category.name}</MDBCardText>
                </MDBCol>
                {/* <MDBCol sm="1">
                  <MDBCardText>{item.typeList[0].name} - {item.typeList[0].author} - {item.typeList[0].publisher} - {item.typeList[0].yearPublisher} - {item.typeList[0].language} - {item.typeList[0].weight} - {item.typeList[0].numOfPages} - {item.typeList[0].size} </MDBCardText>
                </MDBCol> */}
                <MDBCol sm="1">
                  <MDBCardText>{item.productResponse.price}</MDBCardText>
                </MDBCol>
                <MDBCol sm="1">
                  <MDBCardText>{item.productResponse.quantity}</MDBCardText>
                </MDBCol>
                <MDBCol sm="1">
                  <button type="button" class="btn btn-dark btn-small" name="edit" disabled=""
                   style={{ padding: "1px 20px ", fontSize :"13px",borderRadius: 30}}
                   onClick={() => {
                    toggleShowEdit();
                    setDataUpdate({
                      ...dataUpdate,
                      idCategory:item.productResponse.category.id,
                      idProduct : item.productResponse.id,
                      name: item.productResponse.name,
                      price:item.productResponse.price,
                      description:item.productResponse.description,
                      quantity: item.productResponse.quantity,
                      size: item.productResponse.size,
                      author: item.productResponse.author,
                      publisher: item.productResponse.publisher,
                      yearPublisher : item.productResponse.yearPublisher,
                      language : item.productResponse.language,
                      weight : item.productResponse.weight,
                      numOfPages : item.productResponse.numOfPages,
                    });
                    setTypeUpdate({
                      id : item.typeList[0].id,
                      name : item.typeList[0].name,
                      size: item.typeList[0].size,
                      author: item.typeList[0].author,
                      publisher: item.typeList[0].publisher,
                      yearPublisher : item.typeList[0].yearPublisher,
                      language : item.typeList[0].language,
                      weight : item.typeList[0].weight,
                      numOfPages : item.typeList[0].numOfPages,

                    })
                  }}>
                  Edit</button>
                </MDBCol>
                <MDBCol sm="1">
                  <button type="button" class="btn btn-dark btn-small" name="edit" disabled="" 
                   style={{padding: "1px 15px ",backgroundColor:"red",fontSize :"13px",borderRadius:30}} onClick={() => handleDelete(item.productResponse.id)}>
                    Delete
                   </button>
                </MDBCol>
              </MDBRow>
              ))}
              <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                  <MDBModalDialog style={{marginLeft : "25%"}}>
                  <MDBModalContent style={{ width : "160%", marginTop : "4rem"}}>
                      <MDBModalHeader>
                      <MDBModalTitle style={{marginLeft : "10px"}}>Add product</MDBModalTitle>
                      {/* <MDBBtn className='btn-close' color='none' onClick={toggleShowAdd}></MDBBtn> */}
                      </MDBModalHeader>
                      <MDBModalBody style={{marginLeft : "10px"}}>
                        <MDBRow>
                          <MDBCol sm="2">
                              <MDBCardText>Name</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="10">
                            <MDBInput
                              placeholder="Short T-shirt"
                              maxLength="120"
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  name: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-4">
                          <MDBCol sm="2">
                              <MDBCardText>Description</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="10">
                            <MDBTextArea
                              placeholder=". . . . . . ."
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  description: e.target.value,
                                })
                              }}
                              style={{ height : "100px"}}
                            ></MDBTextArea>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-4">
                          <MDBCol sm="2">
                              <MDBCardText>Image</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="10">
                            <div class="file-upload-wrapper">
                              <input type="file" multiple="multiple" onChange={(e) => onImageChange(e)}/>
                            </div>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-4">
                          <MDBCol sm="2">
                              <MDBCardText>Category</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="10">
                          <form class="ordering " method="get">
                            <select
                              name="orderby"
                              class="orderby form-control"
                              aria-label="Shop order"
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  idCategory: e.target.value,
                                })
                              }}
                            >
                              <option value="0" selected="selected">
                                All Category
                              </option>
                              {elemCategory}
                            </select>
                            <input type="hidden" name="paged" value="1" />
                          </form>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow >
                          {/* <MDBCol sm="12">
                              <MDBCardText>Type</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>name</MDBCardText>
                            <MDBInput
                              onChange={(e) => {
                                setType({
                                  ...type,
                                  name: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol> */}
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>language</MDBCardText>
                            <form class="ordering " method="get">
                            <select
                              name="orderby"
                              class="orderby form-control"
                              aria-label="Shop order"
                              onChange={(e) => {
                                setType({
                                  ...type,
                                  language: e.target.value,
                                })
                              }}
                            >
                              {elemTypeLanguage}
                            </select>
                            <input type="hidden" name="paged" value="1" />
                          </form>
                          </MDBCol>
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>size</MDBCardText>
                            <MDBInput
                              onChange={(e) => {
                                setType({
                                  ...type,
                                  size: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>author</MDBCardText>
                            <MDBInput
                              onChange={(e) => {
                                setType({
                                  ...type,
                                  author: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>publisher</MDBCardText>
                            <MDBInput
                              onChange={(e) => {
                                setType({
                                  ...type,
                                  publisher: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>yearPublisher</MDBCardText>
                            <MDBInput
                              onChange={(e) => {
                                setType({
                                  ...type,
                                  yearPublisher: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>weight</MDBCardText>
                            <MDBInput
                              onChange={(e) => {
                                setType({
                                  ...type,
                                  weight: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>numOfPages</MDBCardText>
                            <MDBInput
                              onChange={(e) => {
                                setType({
                                  ...type,
                                  numOfPages: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-4">
                          <MDBCol sm="2">
                              <MDBCardText>Price</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="10">
                            <MDBInput
                              value={data.price.replace(/\D/,'')}
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  price: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-4">
                          <MDBCol sm="2">
                              <MDBCardText>Quantity</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="10">
                            <MDBInput
                              value={data.quantity.replace(/\D/,'')}
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  quantity: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                        </MDBRow>
                      </MDBModalBody>
                      <MDBModalFooter>
                      <MDBBtn color='secondary' style={{height : "40px",borderRadius: 30,padding: "2px 15px"}} onClick={toggleShowAdd}>
                          Close
                      </MDBBtn>
                      {data.name.length && data.description.length && data.idCategory.length && data.price.length && data.quantity.length && file ? 
                      (
                        <MDBBtn style={{height : "40px",borderRadius: 30, padding: "2px 15px"}} 
                        onClick={() => {handleAdd()}} >
                         Save
                      </MDBBtn>
                      ) :
                      (
                        <MDBBtn style={{height : "40px",borderRadius: 30, padding: "2px 15px"}} >
                         Save
                        </MDBBtn>
                      )}
                     
                      </MDBModalFooter>
                  </MDBModalContent>
                  </MDBModalDialog>
              </MDBModal>
              <MDBModal show={isEdit} setShow={setIsEdit} tabIndex='-1'>
                  <MDBModalDialog style={{marginLeft : "25%"}}>
                  <MDBModalContent style={{ width : "160%", marginTop : "4rem"}}>
                      <MDBModalHeader>
                      <MDBModalTitle style={{marginLeft : "10px",}}>Edit product</MDBModalTitle>
                      {/* <MDBBtn className='btn-close' color='none' onClick={toggleShowEdit}></MDBBtn> */}
                      </MDBModalHeader>
                      <MDBModalBody style={{marginLeft : "10px"}}>
                        <MDBRow>
                          <MDBCol sm="2">
                              <MDBCardText>Name</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="10">
                            <MDBInput
                              placeholder="Short T-shirt"
                              value={dataUpdate.name}
                              onChange={(e) => {
                                setDataUpdate({
                                  ...dataUpdate,
                                  name: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-4">
                          <MDBCol sm="2">
                              <MDBCardText>Description</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="10">
                            <MDBTextArea
                              value={dataUpdate.description}
                              onChange={(e) => {
                                setDataUpdate({
                                  ...dataUpdate,
                                  description: e.target.value,
                                })
                              }}
                              style={{ height : "100px"}}
                            ></MDBTextArea>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-4">
                          <MDBCol sm="2">
                              <MDBCardText>Image</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="10">
                            <div class="file-upload-wrapper">
                              <input type="file" id="input-file-now" class="file-upload" onChange={(e) => onImageChange(e)} />
                            </div>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-4">
                          <MDBCol sm="2">
                              <MDBCardText>Category</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="10">
                          <form class="ordering " method="get">
                            <select
                              name="orderby"
                              class="orderby form-control"
                              aria-label="Shop order"
                              value={dataUpdate.idCategory}
                              onChange={(e) => {
                                setDataUpdate({
                                  ...dataUpdate,
                                  idCategory: e.target.value,
                                })
                              }}
                            >
                              <option value="0" selected="selected">
                                All Category
                              </option>
                              {elemCategory}
                            </select>
                            <input type="hidden" name="paged" value="1" />
                          </form>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-4">
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>language</MDBCardText>
                            <form class="ordering " method="get">
                            <select
                              name="orderby"
                              class="orderby form-control"
                              aria-label="Shop order"
                              value={dataUpdate.language}
                              onChange={(e) => {
                                setDataUpdate({
                                  ...dataUpdate,
                                  language: e.target.value,
                                })
                              }}
                            >
                              {elemTypeLanguage}
                            </select>
                            <input type="hidden" name="paged" value="1" />
                          </form>
                          </MDBCol>
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>size</MDBCardText>
                            <MDBInput
                              value={dataUpdate.size}
                              onChange={(e) => {
                                setDataUpdate({
                                  ...dataUpdate,
                                  size: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>author</MDBCardText>
                            <MDBInput
                              value={dataUpdate.author}
                              onChange={(e) => {
                                setDataUpdate({
                                  ...dataUpdate,
                                  author: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>publisher</MDBCardText>
                            <MDBInput
                              value={dataUpdate.publisher}
                              onChange={(e) => {
                                setDataUpdate({
                                  ...dataUpdate,
                                  publisher: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>yearPublisher</MDBCardText>
                            <MDBInput
                              value={dataUpdate.yearPublisher}
                              onChange={(e) => {
                                setDataUpdate({
                                  ...dataUpdate,
                                  yearPublisher: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>weight</MDBCardText>
                            <MDBInput
                              value={dataUpdate.weight}
                              onChange={(e) => {
                                setDataUpdate({
                                  ...dataUpdate,
                                  weight: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                          <MDBCol sm="6" className="d-block">
                            <MDBCardText>numOfPages</MDBCardText>
                            <MDBInput
                              value={dataUpdate.numOfPages}
                              onChange={(e) => {
                                setDataUpdate({
                                  ...dataUpdate,
                                  numOfPages: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-4">
                          <MDBCol sm="2">
                              <MDBCardText>Price</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="10">
                            <MDBInput
                             value={dataUpdate.price}
                             onChange={(e) => {
                               setDataUpdate({
                                 ...dataUpdate,
                                 price: e.target.value,
                               })
                             }}
                            ></MDBInput>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-4">
                          <MDBCol sm="2">
                              <MDBCardText>Quantity</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="10">
                            <MDBInput
                              value={dataUpdate.quantity}
                              onChange={(e) => {
                                setDataUpdate({
                                  ...dataUpdate,
                                  quantity: e.target.value,
                                })
                              }}
                            ></MDBInput>
                          </MDBCol>
                        </MDBRow>
                      </MDBModalBody>
                      <MDBModalFooter>
                      <MDBBtn color='secondary' style={{height : "40px" ,  padding: "2px 15px", fontSize :"13px",borderRadius: 30}} onClick={toggleShowEdit}>
                          Close
                      </MDBBtn>
                      <MDBBtn style={{height : "40px" ,padding: "2px 15px" , fontSize :"13px",borderRadius: 30}} onClick={() => {handleUpdate()}}>Save</MDBBtn>
                      </MDBModalFooter>
                  </MDBModalContent>
                  </MDBModalDialog>
              </MDBModal>
            </MDBCardBody>
          </MDBCard>
      </MDBCol>
  </div>
  )
}
export default Products