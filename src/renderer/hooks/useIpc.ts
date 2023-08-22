import { useEffect, useState } from 'react';
import { Channels, IpcMessage } from '../../shared/models/ipc';

function useIpc<T = any>(channel: Channels, msg?: IpcMessage) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const response = await window.electron.ipcRenderer.sendAsync<T>(
        channel,
        msg ?? { payload: null }
      );

      setData(response.payload);
      setIsLoading(false);
    })();
  }, [channel, msg, refreshFlag]);

  const refresh = () => setRefreshFlag((r) => !r);

  return { isLoading, data, refresh };
}

export { useIpc };
