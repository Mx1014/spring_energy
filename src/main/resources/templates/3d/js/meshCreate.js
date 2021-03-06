function createShadows(json, sceneObjs, scene) {
    console.log(json);
    var o = json.shadow;
    // 绑定灯光
    for(l in sceneObjs["lights"]) {
        if(sceneObjs["lights"][l][1]["shadow"] == true) {
            var sg = new BABYLON.ShadowGenerator(o["size"] || 1024, sceneObjs["lights"][l][0]);
            // 投影参数
            if(o.hasOwnProperty("usePercentageCloserFiltering") && o["usePercentageCloserFiltering"]) {
                sg.usePercentageCloserFiltering = true;
                sg.filteringQuality = BABYLON.ShadowGenerator.QUALITY_LOW;
            }
            // 绑定物体
            for(obj in sceneObjs["objects"]) {
                if(sceneObjs["objects"][obj][1]["shadow"] == true) {
                    sg.addShadowCaster(sceneObjs["objects"][obj][0], true);
                }
            }
        }
    };
}
function createMaterials(json, sceneObjs, scene) {
    // var glass = new BABYLON.PBRMaterial("glass", scene);
    // // glass.alphaMode = BABYLON.Engine.ALPHA_ADD;
    // //glass.reflectionTexture = hdrTexture;
    // // glass.refractionTexture = hdrTexture;
    // //glass.linkRefractionWithTransparency = true;
    // glass.indexOfRefraction = 1;
    // glass.alpha = 0.35;
    // glass.glossiness = 0.7
    // glass.directIntensity = 1.0;
    // //glass.environmentIntensity = 0.5;
    // glass.microSurface = 1;
    // glass.useRadianceOverAlpha = true;
    // glass.useSpecularOverAlpha = true;
    // // glass.reflectivityColor = new BABYLON.Color3(0, 0, 0);
    // glass.albedoColor = new BABYLON.Color3(1, 1, 1);

    // sceneObjs["materials"]["glass"] = [glass, {}];

    for(i in json.materials) {
        var o = json.materials[i];
        if(o.hasOwnProperty("subType") && o["subType"] != "StandardMaterial") {
            var obj = new BABYLON[o.subType](o.id, scene);
            for(var x in o.params) {
                obj[x] = o.params[x];
            }
            obj.reflectionTexture = hdrTexture;
            obj.refractionTexture = hdrTexture;
        } else {
            var obj = new BABYLON.StandardMaterial(o.id, scene);
            // 漫反射
            if(o.hasOwnProperty("diffuse")) {
                // 纹理
                if(o["diffuse"].hasOwnProperty("path")) {
                    obj.diffuseTexture = new BABYLON.Texture(o["diffuse"]["path"], scene);
                }
                // 颜色
                if(o["diffuse"].hasOwnProperty("color")) {
                    obj.diffuseColor = o["diffuse"]["color"];
                }
                // 铺设偏移
                if(o["diffuse"].hasOwnProperty("offset")) {
                    obj.diffuseTexture.uOffset = o["diffuse"]["offset"][0];
                    obj.diffuseTexture.vOffset = o["diffuse"]["offset"][1];
                }
                // 铺设重复
                if(o["diffuse"].hasOwnProperty("scale")) {
                    obj.diffuseTexture.uScale = o["diffuse"]["scale"][0];
                    obj.diffuseTexture.vScale = o["diffuse"]["scale"][1];
                }
            }
            // 镜面(高光)
            if(o.hasOwnProperty("specular")) {
                // 纹理
                if(o["specular"].hasOwnProperty("path")) {
                    obj.specularTexture = new BABYLON.Texture(o["specular"]["path"], scene);
                }
                // 颜色
                if(o["specular"].hasOwnProperty("color")) {
                    obj.specularColor = o["specular"]["color"];
                }
                // 铺设偏移
                if(o["specular"].hasOwnProperty("offset")) {
                    obj.specularTexture.uOffset = o["specular"]["offset"][0];
                    obj.specularTexture.vOffset = o["specular"]["offset"][1];
                }
                // 铺设重复
                if(o["specular"].hasOwnProperty("scale")) {
                    obj.specularTexture.uScale = o["specular"]["scale"][0];
                    obj.specularTexture.vScale = o["specular"]["scale"][1];
                }
            }
            // 自发光
            if(o.hasOwnProperty("emissive")) {
                // 纹理
                if(o["emissive"].hasOwnProperty("path")) {
                    obj.emissiveTexture = new BABYLON.Texture(o["emissive"]["path"], scene);
                }
                // 颜色
                if(o["emissive"].hasOwnProperty("color")) {
                    obj.emissiveColor = o["emissive"]["color"];
                }
                // 铺设偏移
                if(o["emissive"].hasOwnProperty("offset")) {
                    obj.emissiveTexture.uOffset = o["emissive"]["offset"][0];
                    obj.emissiveTexture.vOffset = o["emissive"]["offset"][1];
                }
                // 铺设重复
                if(o["emissive"].hasOwnProperty("scale")) {
                    obj.emissiveTexture.uScale = o["emissive"]["scale"][0];
                    obj.emissiveTexture.vScale = o["emissive"]["scale"][1];
                }
            }
            // 环境
            if(o.hasOwnProperty("ambient")) {
                // 纹理
                if(o["ambient"].hasOwnProperty("path")) {
                    obj.ambientTexture = new BABYLON.Texture(o["ambient"]["path"], scene);
                }
                // 颜色
                if(o["ambient"].hasOwnProperty("color")) {
                    obj.ambientColor = o["ambient"]["color"];
                }
                // 铺设偏移
                if(o["ambient"].hasOwnProperty("offset")) {
                    obj.ambientTexture.uOffset = o["ambient"]["offset"][0];
                    obj.ambientTexture.vOffset = o["ambient"]["offset"][1];
                }
                // 铺设重复
                if(o["ambient"].hasOwnProperty("scale")) {
                    obj.ambientTexture.uScale = o["ambient"]["scale"][0];
                    obj.ambientTexture.vScale = o["ambient"]["scale"][1];
                }
            }
            // 透明贴图
            if(o.hasOwnProperty("opacity")) {
                // 纹理
                if(o["opacity"].hasOwnProperty("path")) {
                    obj.opacityTexture = new BABYLON.Texture(o["opacity"]["path"], scene);
                }
                // 颜色
                if(o["opacity"].hasOwnProperty("color")) {
                    obj.opacityColor = o["opacity"]["color"];
                }
                // 铺设偏移
                if(o["opacity"].hasOwnProperty("offset")) {
                    obj.opacityTexture.uOffset = o["opacity"]["offset"][0];
                    obj.opacityTexture.vOffset = o["opacity"]["offset"][1];
                }
                // 铺设重复
                if(o["opacity"].hasOwnProperty("scale")) {
                    obj.opacityTexture.uScale = o["opacity"]["scale"][0];
                    obj.opacityTexture.vScale = o["opacity"]["scale"][1];
                }
            }
            // 透明度
            if(o.hasOwnProperty("alpha")) {
                obj.alpha = o.alpha;
            }
        }
        sceneObjs["materials"][o.id] = [obj, o];
    };
}
function createLights(json, sceneObjs, scene) {
    for(i in json.lights) {
        var o = json.lights[i];
        var _direct = o.hasOwnProperty("dir") ? new BABYLON.Vector3(o.dir[0], o.dir[1], o.dir[2]) : new BABYLON.Vector3(0, 0, 0);
        var _position = o.hasOwnProperty("pos") ? new BABYLON.Vector3(o.pos[0], o.pos[1], o.pos[2]) : new BABYLON.Vector3(0, 0, 0);
        var obj = new BABYLON[o.type](o.id, _direct, scene);
        obj.position = _position;
        if(o.hasOwnProperty("intensity")) {
            obj.intensity = o.intensity;
        }
        sceneObjs["lights"][o.id] = [obj, o];
    };
}
function createObjects(json, sceneObjs, scene) {
    for(i in json.objects) {
        var o = json.objects[i];
        if(o.type == "box") {
            var obj = BABYLON.MeshBuilder.CreateBox(o.id,
                {
                    height: o.height,
                    width: o.width,
                    depth: o.depth
                }, scene);
        } else if(o.type == "sphere") {
            var obj = BABYLON.MeshBuilder.CreateSphere(o.id, {"diameter": o.diameter, "segments": o.segments}, scene);
        } else if(o.type == "icoSphere") {
            var obj = BABYLON.MeshBuilder.CreateIcoSphere(o.id, {"radius": o.radius, "subdivisions": o.subdivisions}, scene);
        } else if(o.type == "plane") {
            var obj = BABYLON.MeshBuilder.CreatePlane(o.id, {size: o.size}, scene);
        }
        if(obj) {
            // 位置
            if(o.hasOwnProperty("pos")) {
                obj.position = new BABYLON.Vector3(o.pos[0], o.pos[1], o.pos[2]);
            }
            // 旋转
            if(o.hasOwnProperty("rot")) {
                obj.rotation = new BABYLON.Vector3(o.rot[0], o.rot[1], o.rot[2]);
            }
            // 材质
            if(o.hasOwnProperty("style")) {
                obj.material = sceneObjs["materials"][o.style][0];
            } else {
                obj.material = sceneObjs["materials"]["default"][0];
            }
            // 绑定父子关系
            if(o.hasOwnProperty("parent") && sceneObjs["objects"][o.parent] && sceneObjs["objects"][o.parent][0]) {
                obj.parent = sceneObjs["objects"][o.parent][0];
            }
            sceneObjs["objects"][o.id] = [obj, o];
        } else {
            console.log("创建物体失败： ", o);
        }
    };
}