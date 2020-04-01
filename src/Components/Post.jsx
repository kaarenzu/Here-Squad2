import React from 'react';
import { db } from '../Firebase/ConfigFirebase';
import '../Css/post.css'

class CrearPost extends React.Component {
  constructor() {
    super();
    this.state = {
      post: [],
      datatime: new Date(),
      mostrarPost: [],
      name:[]
    }

    this.handlePost = this.handlePost.bind(this);
    this.publicarPost = this.publicarPost.bind(this);

  }
  handlePost(event) {
    this.setState({ post: event.target.value });
    console.log(this.state.post, 'estoy tomando el post')
  }
  publicarPost() {
    db.collection('post').add({
      mensaje: this.state.post,
      datatime: new Date(),
    })
    
      .then((postNew) => {
        const collecionPost = db.collection('post');
        const collecionPostOrdenada = collecionPost.orderBy('datatime', 'desc');
        collecionPostOrdenada.get().then((element) => {
          const postNew = element.docs.map(doc => doc.data());
          console.log(postNew, 'postNew')
          this.setState({
            mostrarPost: postNew
          })

        })
      }
      )

      .catch((error) => {
        console.error('Error adding document: ', error);
      });

  }
  componentDidMount() {
    const collecionPost = db.collection('post');
    const collecionPostOrdenada = collecionPost.orderBy('datatime', 'desc');
    collecionPostOrdenada.get().then((element) => {
      const postNew = element.docs.map(doc => doc.data());

      console.log(postNew, 'postNew')
      this.setState({
        mostrarPost: postNew
      })

    })
 
  }
  render() {

    return (
      <div className="containerTotal">
        
        <div className="containerPost">
        <header><h1 className="textCom">
          Comunidad Move Calm</h1></header>
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
                    <textarea className="textArea" value={element.mensaje}
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
}
export default CrearPost;