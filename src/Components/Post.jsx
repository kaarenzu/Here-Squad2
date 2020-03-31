import React from 'react';
import {db} from '../Firebase/ConfigFirebase';

class CrearPost extends React.Component{
constructor(){
  super();
  this.state= {
    post:[],
    datatime:new Date(),
    mostrarPost :[]
  }
    
   this.handlePost = this.handlePost.bind(this);
   this.publicarPost = this.publicarPost.bind(this);

}
handlePost(event) {
  this.setState({ post: event.target.value });
  console.log(this.state.post, 'estoy tomando el post')
}
publicarPost(){
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
        this.setState ({
          mostrarPost : postNew
        })
    
      })
   
    }
      
    )
    .catch((error) => {
      console.error('Error adding document: ', error);
    });

}
componentDidMount(){
  const collecionPost = db.collection('post');
  const collecionPostOrdenada = collecionPost.orderBy('datatime', 'desc');
  collecionPostOrdenada.get().then((element) => {
    const postNew = element.docs.map(doc => doc.data());
  
    console.log(postNew, 'postNew')
    this.setState ({
      mostrarPost : postNew
    })

  })
}
render(){
  
  return(
    <div>
      <input type="text" className="post" id="post" placeholder="ingresa tu post"
              value={this.state.post} onChange={this.handlePost} />
               <button type="submit" className="btnSignUp" id="registrar" 
              onClick={this.publicarPost}>publicar</button>
            <div>
            {this.state.mostrarPost.map((element, key) =>{
            return (
              <div key={key} className="row-md-auto">
                <div className="mt-4">
                <textarea className="" value={element.mensaje}
               ></textarea>

              </div>
                </div>
            ) 
          })          
        }
        </div>
    </div>
  )
}
}
export default CrearPost;