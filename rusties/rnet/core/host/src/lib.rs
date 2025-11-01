use anyhow::{Ok, Result};
use rnet_peer::peer_info::PeerInfo;
use rnet_tcp::TcpConn;
use rnet_traits::transport::{Connection, SendReceive};

pub mod basic_host;
pub mod keys;
pub mod multiselect;

pub enum HandshakeReturn {
    Raw(RawConnection),
    Secure(),
    Muxed(),
}

#[derive(Debug)]
pub struct RawConnection {
    stream: TcpConn,
    pub peer_info: PeerInfo,
    pub is_initiator: bool,
}

impl RawConnection {
    pub async fn read(&mut self) -> Result<Vec<u8>> {
        Ok(self.stream.recv_msg().await?)
    }

    pub async fn write(&mut self, msg: &Vec<u8>) -> Result<()> {
        Ok(self.stream.send_bytes(msg).await?)
    }

    pub async fn close(&mut self) -> Result<()> {
        Ok(self.stream.close().await?)
    }

    pub fn peer_info(&self) -> PeerInfo {
        self.peer_info.clone()
    }
}
