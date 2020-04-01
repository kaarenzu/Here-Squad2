import React, {Fragment}from 'react';
import { db, firebase } from '../Firebase/ConfigFirebase';
import '../Css/post.css'
import App from '../App.js'


class CrearPost extends React.Component {
  constructor() {
    super();
    this.state = {
      post: [],
      datatime: new Date(),
      mostrarPost: [],
      name:[],
      estado:true
    }

    this.handlePost = this.handlePost.bind(this);
    this.publicarPost = this.publicarPost.bind(this);
    this.signOut= this.signOut.bind(this);

  }
  signOut(){
    firebase.auth().signOut()
    .then(() => {
     this.setState({estado:false})
      console.log('Saliendo...');
    })
    .catch((error) => {
      console.log(error);
    });
}
  
  handlePost(event) {
    this.setState({ post: event.target.value });
    console.log(this.state.post, 'estoy tomando el post')
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
            mostrarPost: postNew,
            name: user.displayName
          

          })

        })
      }
      )

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
    if(this.state.estado){
      return (
        <div className="containerTotal">
          
          <div className="containerPost">
          <header><h1 className="textCom">
            Comunidad Move Calm</h1>
            <button type="submit" className="btn" id=""
              onClick={this.signOut}>cerrar Sesion</button>
            </header>
            <div className="publicarPost">
            
            <input type="text" className="post" id="post" placeholder="Escribe tu comentario aquí"
              value={this.state.post} onChange={this.handlePost} />
            <button type="submit" className="btnPost" id=""
              onClick={this.publicarPost}>publicar</button>
  
            </div>
         
            <div className="containerPublic">
              {this.state.mostrarPost.map((element, key) => {
                return (
                  <div key={key} className="row-md-auto">
                    <div className="mt-4">
                      <textarea className="textArea" value={element.name+":"+"\n"+element.mensaje}
                      ></textarea>
  
                    </div>
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
        {this.state.estado? null : <App/>}

      </Fragment>
    )

    
  }
}
export default CrearPost;