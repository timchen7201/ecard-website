import React, { useEffect, useState, useRef } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginMediaPreview from "filepond-plugin-media-preview";
import "filepond/dist/filepond.min.css";
import $ from "jquery";
import Constant from "../constants";
import { UploadGift } from "../api/gift";
import { useParams } from "react-router-dom";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginMediaPreview);

export default function Upload() {
  const pondRef = useRef();
  const { orderNumber } = useParams(); // main KEY in url
  const [giftFrom, setGiftFrom] = useState();
  const [giftText, setGiftText] = useState("");
  const [giftVideo, setGiftVideo] = useState(null);
  const [giftVideoID, setGiftVideoID] = useState(null);
  const [giftVideoInfo, setGiftVideoInfo] = useState(null);
  const [enable, setEnable] = useState(false);
  useEffect(() => {
    // initialization of step form
    $(".js-step-form").each(function () {
      var stepForm = new window.HSStepForm($(this)).init();
    });
  }, []);
  // useEffect(() => {
  // let timer;
  // if (giftVideoID) {
  //     console.log("giftId",giftVideoID)
  //     timer = setInterval(() => {
  //     // FetchVideo(giftVideoID).then((response) => {
  //     //     const { data } = response;
  //     //     if (data.Status === "published") {
  //     //     setGiftVideoInfo(data);
  //     //     }
  //     // });
  //     // FetchPreViewVideo(giftVideoID).then((response)=>{
  //     //     console.log("---pre",response)
  //     // })
  //     }, 3000);
  // }
  // return () => {
  //     timer = null;
  // };
  // }, [giftVideoID]);

  const handleSubmit = () => {
    UploadGift({
      orderNumber,
      videoID: giftVideoID,
      giftText,
      giftFrom,
    }).then((response) => {
      alert(JSON.stringify(response));
    });
  };
  return (
    <div className="App">
      <form
        className="js-step-form container space-1 space-md-2"
        data-hs-step-form-options='{
        "progressSelector": "#verticalStepFormProgress",
        "stepsSelector": "#verticalStepFormContent"
      }'
      >
        <div className="row mt-10">
          <div className="col-4">
            <ul id="verticalStepFormProgress" className="js-step-progress step">
              <li className="step-item">
                <div className="step-content-wrapper align-items-center">
                  <span className="step-icon step-icon-soft-primary">1</span>
                  <div className="step-content">
                    <h4 className="mb-0">????????????</h4>
                  </div>
                </div>
              </li>

              <li className="step-item">
                <div className="step-content-wrapper align-items-center">
                  <span className="step-icon step-icon-soft-primary">2</span>
                  <div className="step-content">
                    <h4 className="mb-0">????????????</h4>
                  </div>
                </div>
              </li>

              {/* <li className="step-item">
              <div className="step-content-wrapper align-items-center">
                <span className="step-icon step-icon-soft-primary">3</span>
                <div className="step-content">
                  <h4 className="mb-0">????????????</h4>
                </div>
              </div>
            </li> */}

              <li className="step-item">
                <div className="step-content-wrapper align-items-center">
                  <span className="step-icon step-icon-soft-primary">3</span>
                  <div className="step-content">
                    <h4 className="mb-0">??????</h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-8">
            <div
              id="verticalStepFormContent"
              className="h-100 border rounded p-4"
            >
              <div id="verticalSelectStepOne" className="active">
                <div className="form-group">
                  <label className="input-label">?????????</label>
                  <input
                    type="text"
                    className="form-control"
                    value={giftFrom}
                    onChange={(e) => setGiftFrom(e.target.value)}
                  />
                  <span className="text-muted font-size-1">
                    ??????????????????????????????????????????
                  </span>
                </div>
                <div className="form-group">
                  <label className="input-label">?????????</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    value={giftText}
                    onChange={(e) => setGiftText(e.target.value)}
                    placeholder="????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                  />
                  <span className="text-muted font-size-1">
                    ??????????????????????????????
                  </span>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary transition-3d-hover mr-1"
                    data-hs-step-form-next-options='{
                      "targetSelector": "#verticalSelectStepTwo"
                    }'
                  >
                    ?????????
                  </button>
                </div>
              </div>

              <div
                id="verticalSelectStepTwo"
                style={{
                  display: "none",
                  overflow: "hidden",
                }}
              >
                <div className="space-1">
                  <FilePond
                    ref={pondRef}
                    files={giftVideo}
                    onupdatefiles={setGiftVideo}
                    imagePreviewMinHeight={44}
                    imagePreviewMaxHeight={256}
                    server={{
                      url: Constant.MEDIA_URL,
                      process: {
                        url: "/api/Cards/UploadProject",
                        method: "POST",
                        onload: (response) => {
                          console.log("---", response);
                          const { fileId } = JSON.parse(response);
                          console.log("FFFFFileId", fileId);
                          setGiftVideoID(fileId);
                          setEnable(true);
                        },
                      },
                      revert: (uniqueFileId, load, error) => {
                        setGiftVideoID(null);
                        setGiftVideoInfo(null);
                        // Should call the load method when done, no parameters required
                        load();
                      },
                    }}
                    acceptedFileTypes={[
                      "video/mp4",
                      "video/3gp",
                      "video/mov",
                      "video/flv",
                    ]}
                    name="file"
                    labelIdle='?????????????????? ?????? <span class="filepond--label-action">???????????????</span>'
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <a
                    className="btn btn-sm btn-soft-secondary transition-3d-hover mr-1"
                    href="javascript:;"
                    data-hs-step-form-prev-options='{
                 "targetSelector": "#verticalSelectStepOne"
               }'
                  >
                    ????????????
                  </a>

                  {enable ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-primary transition-3d-hover"
                      data-hs-step-form-prev-options='{
                    "targetSelector": "#verticalSelectStepThree"}'
                      onClick={handleSubmit}
                    >
                      ????????????
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-sm btn-primary transition-3d-hover"
                      data-hs-step-form-prev-options='{
                      "targetSelector": "#verticalSelectStepThree"}'
                      onClick={handleSubmit}
                      disabled
                    >
                      ????????????
                    </button>
                  )}
                </div>
              </div>

              <div
                id="verticalSelectStepThree"
                style={{
                  display: "none",
                }}
              >
                <div>
                  <h1>Finish</h1>
                  <div>
                    <i class="fas fa-check-circle text-success fa-5x mb-3"></i>
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm btn-primary transition-3d-hover"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    ??????
                  </button>
                </div>
                {/* {!giftVideoInfo ? (
                <div className="space-2 text-center">
                  <div class="spinner-grow text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <br />
                  <br />
                  <h5>???????????????????????????</h5>
                </div>
              ) : (
                <div
                  className="space-2 text-center"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <video
                    controls
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <source
                      label="720p"
                      src={`https://storage.googleapis.com/agchain/${giftVideoInfo?.HighDefinition}`}
                    />
                    <source
                      label="480p"
                      src={`https://storage.googleapis.com/agchain/${giftVideoInfo?.StandardDefinition}`}
                    />
                  </video>
                </div>
              )} */}
                {/* <div className="d-flex justify-content-end">
                <a
                  className="btn btn-sm btn-soft-secondary transition-3d-hover mr-1"
                  href="javascript:;"
                  data-hs-step-form-prev-options='{
                 "targetSelector": "#verticalSelectStepTwo"
               }'
                >
                  ????????????
                </a>
                <button
                  type="button"
                  className="btn btn-sm btn-primary transition-3d-hover"
                  onClick={handleSubmit}
                >
                  ????????????
                </button>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <video src="https://gift.freshio.me/api/Cards/streaming/a668bf4d-3273-46d8-a280-2445b4ab0cf1" controls/> */}
    </div>
  );
}
