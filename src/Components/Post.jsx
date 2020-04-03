import React, { Fragment } from 'react';
import { db, firebase } from '../Firebase/ConfigFirebase';
import '../Css/post.css'
import App from '../App.js'

class CrearPost extends React.Component {
  constructor() {
    super();
    this.textAreaPost = React.createRef()
    this.state = {
      post: [],
      datatime: new Date(),
      mostrarPost: [],
      name: [],
      estado: true
    }
    this.handlePost = this.handlePost.bind(this);
    this.publicarPost = this.publicarPost.bind(this);
  }

  handlePost(event) {
    this.setState({ post: event.target.value });
  }

  publicarPost() {
    const user = firebase.auth().currentUser;
    db.collection('post').add({
      mensaje: this.state.post,
      datatime: new Date(),
      name: user.displayName,
      userID: user.uid
    })
      .then((postNew) => {
        const collecionPost = db.collection('post');
        const collecionPostOrdenada = collecionPost.orderBy('datatime', 'desc');
        collecionPostOrdenada.get().then((element) => {
          const postNew = element.docs.map(doc => doc.data());
          console.log(postNew, 'postNew')
          this.setState({
            mensaje: [],
            mostrarPost: postNew,
            name: user.displayName
          })
          this.textAreaPost.current.value = ""
        })
      })
        .catch((error) => {
          console.error('Error adding document: ', error);
      });
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    const collecionPost = db.collection('post');
    const collecionPostOrdenada = collecionPost.orderBy('datatime', 'desc');
    collecionPostOrdenada.get().then((element) => {
      const postNew = element.docs.map(doc => doc.data());
      console.log(postNew, 'postNew')
      this.setState({
        mostrarPost: postNew,
        name: user.displayName
      })
    })
  }
  render() {
    if (this.state.estado) {
      return (
        <div className="containerTotal">
          <header className="headerCommunity">
            <h1 className="headerText textCom">Comunidad Move Calm</h1>
            <h6 className="headerText subHeader">En Move Calm no estás solo:</h6>
          </header>
          <div  className="contentCommunity">
            <div className="publicarPost">
              <textarea ref={this.textAreaPost} type="text" className="textAreaPost" id="post" placeholder="Escribe tu comentario aquí"
                value={this.state.post} onChange={this.handlePost} />
              <div className="divOfSend">
                <img src={require('../img/share.png')} alt="Send button" className="buttonSend"
                  onClick={this.publicarPost} />
              </div>
            </div>

            <div className="containerPublic">
              {this.state.mostrarPost.map((element, key) => {
                return (
                  <div className="postArea" key={key}>
                    <p className="textPost textUser">{element.name + ":"}</p>
                    <p className="textPost textMessage">{element.mensaje}</p>
                  </div>
                )
              })
              }
            </div>
          </div>
        </div>
      )
    }
    return (
      <Fragment>
        {this.state.estado ? null : <App />}
      </Fragment>
    )
  }
}
export default CrearPost;