<template>
  <div class="add-map">
    <div class="header">
      <h3 class="map-title">지도 추가</h3>
    </div>

    <div class="border-line"></div>
    <div class="thumbnail"> 썸네일
      <label for="thumbnail-upload" class="thumbnail-label">
        <div class="thumbnail-placeholder">
          <span v-if="!thumbnail" class="add-image-text">
            <img src="@/assets/plus.png" alt="이미지 아이콘" class="image-icon" /> 이미지 추가하기
          </span>
          <img v-else :src="thumbnail" alt="썸네일 이미지" />
        </div>
        <input type="file" id="thumbnail-upload" @change="onFileChange" style="display: none" />
      </label>
    </div>

    <div class="form-group">
      <label for="title">지도 제목</label>
      <input type="text" id="title" v-model="title" placeholder="지도 제목을 입력해주세요." />
    </div>

    <div class="form-group">
      <label for="description">상세 설명 (20자 이상)</label>
      <textarea id="description" v-model="description" placeholder="지도에 대한 상세설명을 작성해주세요." rows="6"></textarea>
    </div>

    <div class="form-group button-container">
      <button class="create-map-button" @click="createMap">지도 생성하기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // axios 인스턴스를 불러옵니다

export default {
  data() {
    return {
      thumbnail: null,
      title: '',
      description: '',
      newTag: '',
      tags: [],
      thumbnailFile: null, // 추가된 부분: 선택된 파일을 저장
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.thumbnail = e.target.result;
        };
        reader.readAsDataURL(file);
        this.thumbnailFile = file; // 추가된 부분: 선택된 파일을 저장
      }
    },
    async createMap() {
      if (this.title && this.description.length >= 20) {
        try {
          const formData = new FormData();
          formData.append('name', this.title);
          formData.append('description', this.description);
          if (this.thumbnailFile) {
            formData.append('userMapImage', this.thumbnailFile);
          }

          const response = await axios.post('/usermaps/add', formData);
          if (response.status === 201) {
            alert('지도 생성에 성공했습니다!');
            // 필요한 경우 추가 작업 수행 (예: 페이지 이동)
          }
        } catch (error) {
          console.error('지도 생성에 실패했습니다:', error);
          alert('지도 생성에 실패했습니다.');
        }
      } else {
        alert('지도 제목과 상세 설명을 올바르게 입력해주세요.');
      }
    },
  },
};
</script>


<style scoped>
/* 스타일 설정 */
.add-map {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 0px solid #ddd;
  border-radius: 4px;
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.map-title {
  margin: 0;
}

.thumbnail {
  margin-bottom: 15px;
  text-align: left;
}

.thumbnail-placeholder {
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.thumbnail-placeholder img {
  max-width: 100%;
  max-height: 100%;
}

.thumbnail-label:hover .thumbnail-placeholder {
  background-color: #e0e0e0;
}

.border-line {
  border-bottom: 1px solid #ddd;
  margin-bottom: 40px;
}

.image-icon {
  width: 15px;
  height: auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group input {
  height: 40px;
}

.button-container {
  text-align: center;
}

.create-map-button {
  width: 100%;
  padding: 15px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.create-map-button:hover {
  background-color: #333;
}
</style>
