import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as nifti from 'nifti-reader-js'
import { BASE_Model_URL } from '../../redux/actions/utils'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getImageData } from '../../redux/api/getImageApi'
import { ToastContainer, toast } from 'react-toastify'

const NiiViewer: React.FC = () => {
  const [niftiData, setNiftiData] = useState<ArrayBuffer | null>(null)
  const [slice, setSlice] = useState<number>(50)
  const [volumeData, setVolumeData] = useState<any>(null)

  useEffect(() => {
    const fetchNiftiData = async () => {
      try {
        const id = new URLSearchParams(location.search).get('id') as string
        const res = await getImageData(id)
        if (res.error) {
          toast.error(res.error)
          return
        }
        console.log('response data', res.data)
        setVolumeData(res.data)
        console.log('volume data', volumeData)
        toast.success('Image fetched Successfully')
        const response = await axios.get<ArrayBuffer>(
          `${BASE_Model_URL}/download-volume/${res.data?.mask_path}`,
          {
            responseType: 'arraybuffer',
          },
        )
        setNiftiData(response.data)
      } catch (error) {
        console.error('Error fetching .nii.gz file:', error)
      }
    }
    fetchNiftiData()
  }, [])

  useEffect(() => {
    if (niftiData) {
      readNIFTI(niftiData)
    }
  }, [niftiData])

  const readNIFTI = (data: ArrayBuffer) => {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
    const slider = document.getElementById('myRange') as HTMLInputElement
    let niftiHeader: any, niftiImage: any

    if (nifti.isCompressed(data)) {
      data = nifti.decompress(data)
    }

    if (nifti.isNIFTI(data)) {
      niftiHeader = nifti.readHeader(data)
      niftiImage = nifti.readImage(niftiHeader, data)
    }

    const slices = niftiHeader.dims[3]
    slider.max = (slices - 1).toString()
    slider.value = Math.round(slices / 2).toString()
    slider.oninput = () => {
      setSlice(parseInt(slider.value))
      drawCanvas(canvas, parseInt(slider.value), niftiHeader, niftiImage)
    }

    drawCanvas(canvas, parseInt(slider.value), niftiHeader, niftiImage)
  }

  const drawCanvas = (
    canvas: HTMLCanvasElement,
    slice: number,
    niftiHeader: any,
    niftiImage: any,
  ) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cols = niftiHeader.dims[1]
    const rows = niftiHeader.dims[2]

    canvas.width = cols
    canvas.height = rows

    const canvasImageData = ctx.createImageData(canvas.width, canvas.height)
    let typedData

    switch (niftiHeader.datatypeCode) {
      case nifti.NIFTI1.TYPE_UINT8:
        typedData = new Uint8Array(niftiImage)
        break
      case nifti.NIFTI1.TYPE_INT16:
        typedData = new Int16Array(niftiImage)
        break
      case nifti.NIFTI1.TYPE_INT32:
        typedData = new Int32Array(niftiImage)
        break
      case nifti.NIFTI1.TYPE_FLOAT32:
        typedData = new Float32Array(niftiImage)
        break
      case nifti.NIFTI1.TYPE_FLOAT64:
        typedData = new Float64Array(niftiImage)
        break
      case nifti.NIFTI1.TYPE_INT8:
        typedData = new Int8Array(niftiImage)
        break
      case nifti.NIFTI1.TYPE_UINT16:
        typedData = new Uint16Array(niftiImage)
        break
      case nifti.NIFTI1.TYPE_UINT32:
        typedData = new Uint32Array(niftiImage)
        break
      default:
        return
    }

    const sliceSize = cols * rows
    const sliceOffset = sliceSize * slice

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const offset = sliceOffset + row * cols + col
        const value = typedData[offset]

        canvasImageData.data[(row * cols + col) * 4] = value & 0xff
        canvasImageData.data[(row * cols + col) * 4 + 1] = value & 0xff
        canvasImageData.data[(row * cols + col) * 4 + 2] = value & 0xff
        canvasImageData.data[(row * cols + col) * 4 + 3] = 0xff // Alpha channel
      }
    }

    ctx.putImageData(canvasImageData, 0, 0)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">3D Segmented Result</h1>
      <div className="mb-4">
        <canvas
          id="myCanvas"
          width="300"
          height="300"
          className="border rounded-md"
        ></canvas>
        <br />
        <input
          type="range"
          min="1"
          max="100"
          className="slider mt-2 w-[32rem]"
          id="myRange"
        />
        <p className="text-sm mt-2">Slice: {slice}</p>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <a
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          download
          href={`${BASE_Model_URL}/download-volume/${volumeData?.mask_path}`}
        >
          Download
        </a>
        <CopyToClipboard
          text={`${BASE_Model_URL}/download-volume/${volumeData?.mask_path}`}
          onCopy={() => {
            toast.success('URL copied')
          }}
        >
          <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
            Copy URL
          </button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

export default NiiViewer
