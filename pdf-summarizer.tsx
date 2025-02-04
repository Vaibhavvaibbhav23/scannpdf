import { useState } from 'react'
import { Upload, FileText, Search, RefreshCw, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PDFSummarizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [summary, setSummary] = useState<string>('')

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
    } else {
      alert('Please select a PDF file')
    }
  }

  const handleUpload = () => {
    console.log('Uploading:', selectedFile?.name)
  }

  const handleShowPDF = () => {
    console.log('Showing PDF:', selectedFile?.name)
  }

  const handleReset = () => {
    setSelectedFile(null)
    setSummary('')
  }

  const handleSummarize = () => {
    setSummary(`This is a mock summary of the PDF "${selectedFile?.name}". In a real application, this would be generated by processing the PDF content.`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="container mx-auto max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-100 to-indigo-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">PDF Sum</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload PDF
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload a new PDF file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleShowPDF} variant="outline" className="bg-white text-blue-500 border-blue-500 hover:bg-blue-50">
                    <FileText className="w-4 h-4 mr-2" />
                    Show PDF
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Display the selected PDF</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-gray-700">Select PDF</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="mb-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {selectedFile && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">File Details:</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      <li>Name: {selectedFile.name}</li>
                      <li>Size: {Math.round(selectedFile.size / 1024)} KB</li>
                      <li>Type: {selectedFile.type}</li>
                    </ul>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={handleReset} variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-100">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Clear selected file and summary</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={handleSummarize} className="bg-green-500 hover:bg-green-600 text-white">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Summary
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Generate a summary of the PDF</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 bg-white shadow-md">
              <CardContent className="h-64 md:h-full">
                {summary ? (
                  <div className="h-full overflow-auto p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-bold mb-2 text-gray-800">Summary:</h3>
                    <p className="text-gray-700">{summary}</p>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                    PDF content or summary will appear here
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 flex items-center space-x-2">
            <Input type="text" placeholder="Search in PDF..." className="flex-grow border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Search className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search within the PDF</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
