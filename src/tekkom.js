import React, { Component } from "react";
import axios from "axios";
import { Modal } from "antd";
import "antd/dist/antd.css";
export default class tekkom extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      tekkom: [],
      visible: false,
      nama: "",
      asal: "",
      nim: "",
    };
  }

  handleButton = (url) => {
    alert(url);
    window.open(url);
  };
  handleTambahOrang = () => {
    alert("Tugas Modul 5\nKelompok 32\nHeidy Novendra - 21120117130035\nDinisya Zalfa Wafi - 21120117130068");
    //this.setState({
      //visible: true,
    //});
  };
  handleNama = (e) => {
    this.setState({
      nama: e.target.value,
    });
    console.log(this.state.nama);
  };
  handleNim = (e) => {
    this.setState({
      nim: e.target.value,
    });
    console.log(this.state.nim);
  };
  handleAsal = (e) => { 
    this.setState({
      asal: e.target.value,
    });
    console.log(this.state.asal);
  };
  handleSubmit = () => {
    if (
      this.state.nama !== "" &&
      this.state.nim !== "" &&
      !this.state.asal !== ""
    ) {
      axios({
        method: "post",
        url: "https://backendcatatantugas.herokuapp.com/mahasiswa/add",
        headers: {
          accept: "*/*",
        },
        data: {
          nama: this.state.nama,
          nim: this.state.nim,
          asal: this.state.asal,
        },
      })
        .then((data) => {
          alert("berhasil menambahkan");
          window.location.reload();
        })
        .catch((error) => {
          alert("gagal lur");
        });
    } else { 
      alert("pastikan semua kolom terisi");
    }
  };
  componentDidMount() {
    axios({
      method: "get",
      url: "https://www.scorebat.com/video-api/v1/",
      headers: {
        accept: "*/*",
      },
    })
      .then((data) => {
        console.log(data.data);
        this.setState({
          tekkom: data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="boxWhite">
          <center>
            <h1>Daftar Pertandingan Sepak Bola</h1>
          </center>
          <center>
            <button onClick={this.handleTambahOrang}>Dont forget to smile :)</button> 
          </center>
          <Modal
            title="Tambah Orang Bosque"
            centered
            visible={this.state.visible}
            onOk={this.handleSubmit}
            onCancel={() => this.setState({ visible: false })}
            width={500}
          >
            <div style={{ textAlign: "center" }}>
              <p>Nama : </p>{" "}
              <input
                type="text"
                placeholder="nama"
                onChange={this.handleNama}
              />
              <br />
              <p>Nim : </p>{" "}
              <input type="text" placeholder="nim" onChange={this.handleNim} />
              <br />
              <p>Asal : </p>{" "}
              <input
                type="text"
                placeholder="asal"
                onChange={this.handleAsal}
              />
              <br />
            </div>
          </Modal>

          {this.state.tekkom.map((results, index) => { 
            return (
              <div className="card" key={results.title}>
                <div className="card-body">
                  <h5 className="card-title">Judul : {results.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Kompetisi : {results.competition.name}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Tanggal : {results.date}
                  </h6>
                  <img alt={results.thumbnail} src={results.thumbnail} style={{height:'150px', width:'210px'}} />
                </div>
                <button 
                  className="button"
                  onClick={() => this.handleButton(results.url)}
                >
                  Stream Sekarang!
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
} 