import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';

export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      theme="dark"
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'bg-gray-900 text-white border border-cyan-500/40 shadow-xl',
        },
      }}
      {...props}
    />
  );
}

export default Toaster;
