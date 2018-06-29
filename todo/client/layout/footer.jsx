import className from '../assets/style/footer.styl'
//id="{className.footer}"

export default{
  data () {
    return {
      author: 'Huu'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
